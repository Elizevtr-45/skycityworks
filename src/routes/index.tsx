import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/useReveal";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustBlock } from "@/components/site/TrustBlock";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { Showroom } from "@/components/site/Showroom";
import { Furniture } from "@/components/site/Furniture";
import { SocialProof } from "@/components/site/SocialProof";
import { Process } from "@/components/site/Process";
import { Reviews } from "@/components/site/Reviews";
import { Team } from "@/components/site/Team";
import { VideoBlog } from "@/components/site/VideoBlog";
import { Pricing } from "@/components/site/Pricing";
import { Calculator } from "@/components/site/Calculator";
import { LeadForm } from "@/components/site/LeadForm";
import { FAQ } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "СКАЙСИТИ — Строительство и ремонт под ключ в Приморском крае" },
      {
        name: "description",
        content:
          "СКАЙСИТИ — строительная компания полного спектра услуг в Приморском крае. Ремонт квартир и домов под ключ, изготовление мебели на заказ. 7+ лет опыта, 2800+ проектов, гарантия 2 года + расширенная пожизненная.",
      },
      { property: "og:title", content: "СКАЙСИТИ — Строительство и ремонт под ключ" },
      {
        property: "og:description",
        content: "Полный спектр услуг: ремонт, отделка, мебель на заказ. 2800+ проектов, расширенная гарантия.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  useReveal();
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustBlock />
      <About />
      <Services />
      <Portfolio />
      <Showroom />
      <Furniture />
      <SocialProof />
      <Process />
      <Reviews />
      <Team />
      <VideoBlog />
      <Pricing />
      <Calculator />
      <LeadForm />
      <FAQ />
      <Footer />
      <CookieBanner />
    </main>
  );
}
