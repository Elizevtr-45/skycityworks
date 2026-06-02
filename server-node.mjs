// Node-обёртка для запуска TanStack Start сборки на VPS.
// Использовать: node --env-file=.env server-node.mjs
//
// Раздаёт:
//   - статику из dist/client/  (включая assets/*)
//   - всё остальное идёт в fetch-обработчик из dist/server/server.js
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import serverEntry from "./dist/server/server.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const CLIENT_DIR = resolve(__dirname, "dist/client");
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "127.0.0.1";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

async function tryStatic(urlPath) {
  if (urlPath.includes("..")) return null;
  // /api/* и /serverFn/* — динамика, не статика
  if (urlPath.startsWith("/api/") || urlPath.startsWith("/_serverFn/")) return null;

  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const filePath = normalize(join(CLIENT_DIR, decoded));
  if (!filePath.startsWith(CLIENT_DIR)) return null;

  try {
    const s = await stat(filePath);
    if (s.isFile()) return { path: filePath, size: s.size };
  } catch {}
  return null;
}

function nodeReqToWebRequest(req) {
  const proto = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = `${proto}://${host}${req.url}`;

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (Array.isArray(v)) v.forEach((x) => headers.append(k, x));
    else if (v != null) headers.set(k, String(v));
  }

  const init = { method: req.method, headers };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = Readable.toWeb(req);
    init.duplex = "half";
  }
  return new Request(url, init);
}

async function writeWebResponse(webRes, res) {
  res.statusCode = webRes.status;
  webRes.headers.forEach((v, k) => res.setHeader(k, v));
  if (!webRes.body) return res.end();
  const reader = webRes.body.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    res.write(value);
  }
  res.end();
}

const server = createServer(async (req, res) => {
  try {
    // 1. Статика (assets + favicon + manifest и т.п.)
    const file = await tryStatic(req.url);
    if (file) {
      const ext = extname(file.path).toLowerCase();
      res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
      // долгоживущий кэш для хэшированных ассетов
      if (req.url.startsWith("/assets/")) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
      res.setHeader("Content-Length", file.size);
      createReadStream(file.path).pipe(res);
      return;
    }

    // 2. Всё остальное — в TanStack Start handler (SSR + /api/*)
    const webReq = nodeReqToWebRequest(req);
    const webRes = await serverEntry.fetch(webReq, process.env, {
      waitUntil: () => {},
      passThroughOnException: () => {},
    });
    await writeWebResponse(webRes, res);
  } catch (err) {
    console.error("Request error:", err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
    }
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`✓ Server listening on http://${HOST}:${PORT}`);
});
