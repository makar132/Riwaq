import StatsSection from "../components/StatsSection";
<<<<<<< HEAD
import HeroSection from "../components/HeroSection.jsX";
import WhatIsTOTC from "../components/WhatIsTOTC";
=======
import HeroSection from "../components/HeroSection";
>>>>>>> origin/main
import FeaturesSection from "../components/FeaturesSection";
import ShowcaseSection from "../components/ShowcaseSection";
import HighlightsSection from "../components/HighlightsSection";
import LastSection from "../components/LastSection";
export default function Home() {
  return (
    <div className="min-h-[calc(100svh-var(--nav-h))]">
        <section className="mb-12">
          <HeroSection />
        </section>
        <section className="mb-12">
          <StatsSection />
        </section>
        <section className="mb-16">
          <FeaturesSection />
        </section>
      </div>
<<<<<<< HEAD
      <div>
        <StatsSection />
      </div>
      <div>
        <FeaturesSection />
      </div>
      <div>
        <WhatIsTOTC />
      </div>
      <div>
        <ShowcaseSection />
      </div>
      <div>
        <HighlightsSection />
      </div>
      <div>
        <LastSection />
      </div>
    </div>
=======
    
>>>>>>> origin/main
  );
}
