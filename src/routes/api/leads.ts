import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getRequestIP, getRequestHeader } from "@tanstack/react-start/server";
import crypto from "crypto";

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(5).max(30),
  area_m2: z.number().int().min(1).max(10000).nullable().optional(),
  object_type: z.string().trim().max(50).nullable().optional(),
  source: z.string().trim().max(50).nullable().optional(),
  message: z.string().trim().max(2000).nullable().optional(),
  // honeypot — должно быть пустым
  website: z.string().max(0).optional(),
});

const ALLOWED_ORIGINS = [
  "https://skycityworks.lovable.app",
  "https://skycityworks.ru",
  "https://www.skycityworks.ru",
];

function buildCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin") ?? "";
  const allowed =
    ALLOWED_ORIGINS.includes(origin) ||
    /^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin) ||
    /^https?:\/\/localhost(:\d+)?$/.test(origin);
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": allowed ? origin : ALLOWED_ORIGINS[0],
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(body: unknown, status: number, request: Request) {
  return new Response(JSON.stringify(body), { status, headers: buildCorsHeaders(request) });
}

function hashIp(ip: string | null): string {
  const salt = process.env.IP_HASH_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!salt) {
    throw new Error("IP_HASH_SECRET (or SUPABASE_SERVICE_ROLE_KEY) is not configured");
  }
  return crypto.createHash("sha256").update(`${ip ?? "unknown"}:${salt}`).digest("hex").slice(0, 32);
}

async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, skipped: true };
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const errBody = await res.text();
      console.error("Telegram send failed:", res.status, errBody);
      return { ok: false };
    }
    return { ok: true };
  } catch (e) {
    console.error("Telegram send exception:", e);
    return { ok: false };
  }
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      OPTIONS: async ({ request }) => new Response(null, { status: 204, headers: buildCorsHeaders(request) }),
      POST: async ({ request }) => {
        try {
          const raw = await request.json().catch(() => null);
          const parsed = LeadSchema.safeParse(raw);
          if (!parsed.success) {
            return json({ error: "Invalid input" }, 400, request);
          }
          const data = parsed.data;

          // honeypot — тихо «успех», но ничего не делаем
          if (data.website && data.website.length > 0) {
            return json({ ok: true }, 200, request);
          }

          const ip = getRequestIP({ xForwardedFor: true }) ?? null;
          const userAgent = getRequestHeader("user-agent") ?? null;
          const ipHash = hashIp(ip);

          // rate-limit: не больше 5 заявок с одного IP за 10 минут
          const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
          const { count } = await supabaseAdmin
            .from("leads")
            .select("id", { count: "exact", head: true })
            .eq("ip_hash", ipHash)
            .gte("created_at", since);
          if ((count ?? 0) >= 5) {
            return json({ error: "Too many requests" }, 429, request);
          }

          const { data: inserted, error } = await supabaseAdmin
            .from("leads")
            .insert({
              name: data.name,
              phone: data.phone,
              area_m2: data.area_m2 ?? null,
              object_type: data.object_type ?? null,
              source: data.source ?? null,
              message: data.message ?? null,
              ip_hash: ipHash,
              user_agent: userAgent,
            })
            .select("id")
            .single();

          if (error) {
            console.error("Insert lead failed:", error);
            return json({ error: "Server error" }, 500, request);
          }

          const lines = [
            "🔔 <b>Новая заявка — СКАЙСИТИ</b>",
            `👤 <b>Имя:</b> ${escapeHtml(data.name)}`,
            `📞 <b>Телефон:</b> ${escapeHtml(data.phone)}`,
            data.area_m2 ? `📐 <b>Площадь:</b> ${data.area_m2} м²` : null,
            data.object_type ? `🏠 <b>Тип:</b> ${escapeHtml(data.object_type)}` : null,
            data.source ? `📍 <b>Источник:</b> ${escapeHtml(data.source)}` : null,
            data.message ? `💬 <b>Сообщение:</b> ${escapeHtml(data.message)}` : null,
            `🆔 <code>${inserted.id}</code>`,
          ].filter(Boolean) as string[];

          await notifyTelegram(lines.join("\n"));

          return json({ ok: true, id: inserted.id }, 200, request);
        } catch (e) {
          console.error("POST /api/leads exception:", e);
          return json({ error: "Server error" }, 500, request);
        }
      },
    },
  },
});
