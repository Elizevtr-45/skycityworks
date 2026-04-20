import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";

// Русская типографика: вставляем неразрывные пробелы (\u00A0) после
// предлогов, коротких союзов и частицы «не», чтобы они не «висели»
// в конце строки.
const SHORT_WORDS = [
  "в", "во", "на", "за", "под", "о", "об", "обо", "от", "до", "у", "к",
  "ко", "с", "со", "без", "через", "из", "изо", "над", "про", "при",
  "по", "для",
  "и", "а", "но", "да", "или", "либо", "же",
  "не", "ни",
];

function applyRussianTypography(root: HTMLElement) {
  const re = new RegExp(
    `(^|[\\s(«"'])(${SHORT_WORDS.join("|")})\\s+`,
    "gi",
  );
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName;
      if (
        tag === "SCRIPT" ||
        tag === "STYLE" ||
        tag === "CODE" ||
        tag === "PRE" ||
        tag === "TEXTAREA" ||
        tag === "INPUT"
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      if (parent.isContentEditable) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) nodes.push(n as Text);
  for (const node of nodes) {
    const original = node.nodeValue ?? "";
    const updated = original.replace(re, (_m, pre, word) => `${pre}${word}\u00A0`);
    if (updated !== original) node.nodeValue = updated;
  }
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Премиальный лендинг для ремонта квартир во Владивостоке с онлайн-калькулятором и деталями проектов." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Премиальный лендинг для ремонта квартир во Владивостоке с онлайн-калькулятором и деталями проектов." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "Премиальный лендинг для ремонта квартир во Владивостоке с онлайн-калькулятором и деталями проектов." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f5983ff3-f266-4db1-8c69-bd8d1cea37c9/id-preview-cc93dd75--1f3ceb27-3ad9-4a40-bed2-a3fca60cec91.lovable.app-1776673329160.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f5983ff3-f266-4db1-8c69-bd8d1cea37c9/id-preview-cc93dd75--1f3ceb27-3ad9-4a40-bed2-a3fca60cec91.lovable.app-1776673329160.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useEffect(() => {
    const run = () => applyRussianTypography(document.body);
    run();
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            applyRussianTypography(node as HTMLElement);
          } else if (node.nodeType === Node.TEXT_NODE) {
            const parent = (node as Text).parentElement;
            if (parent) applyRussianTypography(parent);
          }
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return <Outlet />;
}
