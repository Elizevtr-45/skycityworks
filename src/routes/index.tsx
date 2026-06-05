import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { Calculator } from "@/components/site/Calculator";
import { Furniture } from "@/components/site/Furniture";
import { SocialProof } from "@/components/site/SocialProof";
import { Process } from "@/components/site/Process";
import { Reviews } from "@/components/site/Reviews";
import { Team } from "@/components/site/Team";

import { Pricing } from "@/components/site/Pricing";
import { LeadPopup } from "@/components/site/LeadForm";
import { FAQ } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { Promotions } from "@/components/site/Promotions";
import { HiddenMountPromo } from "@/components/site/HiddenMountPromo";
import { SocialCTA } from "@/components/site/SocialCTA";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { SvoDiscountBadge } from "@/components/site/SvoDiscountBadge";



export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Ремонт квартир под ключ Владивосток — СКАЙСИТИ | 2800+ объектов" },
      {
        name: "description",
        content:
          "Ремонт квартир во Владивостоке без переплат. Эконом. Стандарт. Премиум. Цена фиксируется в договоре. Столешница из камня. Мебель на заказ. Скидка 10% участникам СВО. Изделия из керамогранита. Кэшбэк 10%.",
      },
      { property: "og:title", content: "Ремонт квартир под ключ Владивосток — СКАЙСИТИ | 2800+ объектов" },
      {
        property: "og:description",
        content:
          "Ремонт квартир во Владивостоке без переплат. Эконом. Стандарт. Премиум. Цена фиксируется в договоре. Столешница из камня. Мебель на заказ. Скидка 10% участникам СВО. Изделия из керамогранита. Кэшбэк 10%.",
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
      <Portfolio />
      <Pricing />
      <Calculator />
      <Reviews />
      <About />
      <Promotions />
      <Process />
      <Services />
      <SocialCTA />
      <Furniture />
      <HiddenMountPromo />
      <SocialProof />
      <Team />



      <FAQ />
      <Footer />
      <CookieBanner />
      <LeadPopup />
      <ScrollToTop />
      <SvoDiscountBadge />
    </main>
  );
}
