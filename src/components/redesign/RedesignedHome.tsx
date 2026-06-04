import { RedesignNavbar } from "./RedesignNavbar";
import { RedesignHero } from "./RedesignHero";
import { SpecialOffers } from "./SpecialOffers";
import { RedesignServices } from "./RedesignServices";
import { SocialProof } from "@/components/site/SocialProof";
import { Portfolio } from "@/components/site/Portfolio";
import { Calculator } from "@/components/site/Calculator";
import { Pricing } from "@/components/site/Pricing";
import { Process } from "@/components/site/Process";
import { Reviews } from "@/components/site/Reviews";
import { FAQ } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";
import { LeadForm, LeadPopup } from "@/components/site/LeadForm";
import { CookieBanner } from "@/components/site/CookieBanner";
import { ScrollToTop } from "@/components/site/ScrollToTop";

/**
 * Redesigned home — black & orange identity inspired by remontstvoyformat.ru.
 * Locally overrides design tokens to a black/orange palette so reused
 * sections (SocialProof, Portfolio, Pricing, etc.) inherit the new look.
 */
export function RedesignedHome() {
  return (
    <div
      className="redesign-v2 min-h-screen bg-black text-white"
      style={
        {
          // Override tokens within this subtree only
          ["--background" as string]: "oklch(0 0 0)",
          ["--foreground" as string]: "oklch(0.98 0 0)",
          ["--card" as string]: "oklch(0.08 0 0)",
          ["--card-foreground" as string]: "oklch(0.98 0 0)",
          ["--popover" as string]: "oklch(0.08 0 0)",
          ["--popover-foreground" as string]: "oklch(0.98 0 0)",
          ["--primary" as string]: "oklch(0.7 0.2 45)",
          ["--primary-foreground" as string]: "oklch(1 0 0)",
          ["--accent" as string]: "oklch(0.62 0.22 40)",
          ["--accent-foreground" as string]: "oklch(1 0 0)",
          ["--secondary" as string]: "oklch(0.15 0 0)",
          ["--secondary-foreground" as string]: "oklch(0.98 0 0)",
          ["--muted" as string]: "oklch(0.18 0 0)",
          ["--muted-foreground" as string]: "oklch(0.7 0 0)",
          ["--border" as string]: "oklch(0.25 0 0)",
          ["--input" as string]: "oklch(0.2 0 0)",
          ["--ring" as string]: "oklch(0.7 0.2 45)",
          ["--dark" as string]: "oklch(0 0 0)",
          ["--dark-foreground" as string]: "oklch(1 0 0)",
          ["--light" as string]: "oklch(0.1 0 0)",
        } as React.CSSProperties
      }
    >
      <RedesignNavbar />
      <RedesignHero />
      <SpecialOffers />
      <RedesignServices />
      <Calculator />
      <SocialProof />
      <Portfolio />
      <Pricing />
      <Process />
      <Reviews />
      <FAQ />
      <LeadForm />
      <Footer />
      <CookieBanner />
      <LeadPopup />
      <ScrollToTop />
    </div>
  );
}
