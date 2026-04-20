import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
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

import { Pricing } from "@/components/site/Pricing";
import { Calculator } from "@/components/site/Calculator";
import { LeadForm, LeadPopup } from "@/components/site/LeadForm";
import { FAQ } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { BathroomPromo } from "@/components/site/BathroomPromo";
import { SocialCTA } from "@/components/site/SocialCTA";
import { ScrollToTop } from "@/components/site/ScrollToTop";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "СКАЙСИТИ — Ремонт и строительство под ключ во Владивостоке" },
      {
        name: "description",
        content:
          "Строим и ремонтируем под ключ во Владивостоке и Приморском крае. 7+ лет опыта, 2800+ сданных объектов, гарантия 2 года + расширенная пожизненная. Квартиры, дома, мебель на заказ — без переплат и срывов сроков.",
      },
      { property: "og:title", content: "СКАЙСИТИ — Ремонт и строительство под ключ во Владивостоке" },
      {
        property: "og:description",
        content:
          "2800+ объектов, 7+ лет опыта, гарантия до пожизненной. Ремонт квартир и домов под ключ, мебель на заказ. Прозрачная смета, фиксированные сроки и цены.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  useReveal();
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);
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
      <BathroomPromo />
      <SocialProof />
      <Process />
      <Reviews />
      <Team />
      
      <Pricing />
      <Calculator />
      <LeadForm />
      <SocialCTA />
      <FAQ />
      <Footer />
      <CookieBanner />
      <LeadPopup />
      <ScrollToTop />
    </main>
  );
}
