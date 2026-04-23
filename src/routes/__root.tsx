import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const yandexMetrikaScript = `(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {
    if (document.scripts[j].src === r) { return; }
  }
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=108729615', 'ym');
ym(108729615, 'init', {
  ssr: true,
  webvisor: true,
  clickmap: true,
  ecommerce: 'dataLayer',
  referrer: document.referrer,
  url: location.href,
  accurateTrackBounce: true,
  trackLinks: true,
});`;

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
        <script dangerouslySetInnerHTML={{ __html: yandexMetrikaScript }} />
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108729615"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
