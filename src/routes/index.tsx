import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustBlock } from "@/components/site/TrustBlock";
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
import { LeadForm, LeadPopup } from "@/components/site/LeadForm";
import { FAQ } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { BathroomPromo } from "@/components/site/BathroomPromo";
import { ApartmentPromo } from "@/components/site/ApartmentPromo";
import { HiddenMountPromo } from "@/components/site/HiddenMountPromo";
import { SocialCTA } from "@/components/site/SocialCTA";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { SvoDiscountBadge } from "@/components/site/SvoDiscountBadge";
import { RedesignedHome } from "@/components/redesign/RedesignedHome";
import { DesignToggle } from "@/components/redesign/DesignToggle";

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
  const [isV2, setIsV2] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("design-v2");
      if (stored === "0") setIsV2(false);
      else setIsV2(true); // default to new design
    } catch {
      setIsV2(true);
    }
    if (typeof window !== "undefined" && window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  const toggle = () => {
    setIsV2((prev) => {
      const next = !prev;
      try { localStorage.setItem("design-v2", next ? "1" : "0"); } catch {}
      return next;
    });
  };

  if (mounted && isV2) {
    return (
      <>
        <RedesignedHome />
        <DesignToggle isV2={true} onToggle={toggle} />
      </>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustBlock />
      <About />
      <Calculator />
      <Services />
      <Portfolio />
      <Pricing />
      <Furniture />
      <BathroomPromo />
      <ApartmentPromo />
      <HiddenMountPromo />
      <SocialProof />
      <Process />
      <Reviews />
      <Team />
      <LeadForm />
      <SocialCTA />
      <FAQ />
      <Footer />
      <CookieBanner />
      <LeadPopup />
      <ScrollToTop />
      <SvoDiscountBadge />
      {mounted && <DesignToggle isV2={false} onToggle={toggle} />}
    </main>
  );
}
