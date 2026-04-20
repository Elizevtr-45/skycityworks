import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/useReveal";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustBlock } from "@/components/site/TrustBlock";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { Showroom } from "@/components/site/Showroom";
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

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Велес·Ремонт — Ремонт квартир под ключ во Владивостоке" },
      {
        name: "description",
        content:
          "Премиальный ремонт квартир под ключ во Владивостоке. Фиксированная цена, точные сроки, гарантия до 5 лет. 120+ реализованных проектов.",
      },
      { property: "og:title", content: "Велес·Ремонт — Ремонт квартир под ключ во Владивостоке" },
      {
        property: "og:description",
        content: "Премиальный ремонт квартир под ключ. Гарантия до 5 лет. 120+ проектов.",
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
      <Services />
      <Portfolio />
      <Showroom />
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
    </main>
  );
}
