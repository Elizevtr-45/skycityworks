import { Outlet, Link, createRootRoute, HeadContent, Scripts, ScriptOnce } from "@tanstack/react-router";

import appCss from "../styles.css?url";

// Скрипт типографики: выполняется ДО гидратации React.
// Вставляет неразрывные пробелы (\u00A0) после русских предлогов,
// коротких союзов и частиц «не»/«ни». Запускается также после загрузки DOM,
// чтобы покрыть весь начальный SSR-контент. React увидит уже изменённый DOM
// и гидрация пройдёт без mismatch.
const TYPOGRAPHY_SCRIPT = `(function(){
  var WORDS = ["в","во","на","за","под","о","об","обо","от","до","у","к","ко","с","со","без","через","из","изо","над","про","при","по","для","и","а","но","да","или","либо","же","не","ни"];
  var re = new RegExp("(^|[\\\\s(«\\"'])(" + WORDS.join("|") + ")\\\\s+", "gi");
  var SKIP = {SCRIPT:1,STYLE:1,CODE:1,PRE:1,TEXTAREA:1,INPUT:1,NOSCRIPT:1};
  function walk(root){
    if(!root) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while((n = w.nextNode())) nodes.push(n);
    for(var i=0;i<nodes.length;i++){
      var node = nodes[i], p = node.parentElement;
      if(!p || SKIP[p.tagName] || p.isContentEditable) continue;
      var v = node.nodeValue;
      if(!v || !v.trim()) continue;
      var u = v.replace(re, function(_m, pre, word){ return pre + word + "\\u00A0"; });
      if(u !== v) node.nodeValue = u;
    }
  }
  function run(){ walk(document.body); }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Запрошенная страница не существует или была перемещена.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            На главную
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
      { title: "СКАЙСИТИ — Строительство и ремонт под ключ во Владивостоке" },
      {
        name: "description",
        content:
          "Строим и ремонтируем под ключ во Владивостоке и Приморском крае. 7+ лет опыта, 2800+ сданных объектов, гарантия 2 года + расширенная пожизненная. Ремонт квартир, домов и мебель на заказ — без переплат и срывов сроков.",
      },
      { name: "author", content: "СКАЙСИТИ" },
      { name: "theme-color", content: "#1a1a1a" },
      { property: "og:title", content: "СКАЙСИТИ — Ремонт и строительство под ключ во Владивостоке" },
      {
        property: "og:description",
        content:
          "2800+ объектов, 7+ лет опыта, гарантия до пожизненной. Ремонт квартир и домов под ключ, мебель на заказ. Прозрачная смета, фиксированные сроки и цены.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: "СКАЙСИТИ" },
      { property: "og:url", content: "https://skycityworks.lovable.app" },
      { property: "og:image", content: "https://skycityworks.lovable.app/android-chrome-512x512.png" },
      { property: "og:image:width", content: "512" },
      { property: "og:image:height", content: "512" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "СКАЙСИТИ — Ремонт и строительство под ключ во Владивостоке" },
      {
        name: "twitter:description",
        content:
          "2800+ объектов, 7+ лет опыта, гарантия до пожизненной. Ремонт квартир и домов под ключ, мебель на заказ. Прозрачная смета, фиксированные сроки и цены.",
      },
      { name: "twitter:image", content: "https://skycityworks.lovable.app/android-chrome-512x512.png" },
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
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
        <ScriptOnce>{TYPOGRAPHY_SCRIPT}</ScriptOnce>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
