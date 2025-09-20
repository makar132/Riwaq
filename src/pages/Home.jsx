import StatsSection from "../components/StatsSection";
import HeroSection from "../components/HeroSection.jsX";
import WhatIsTOTC from "../components/WhatIsTOTC";
import FeaturesSection from "../components/FeaturesSection";
import ShowcaseSection from "../components/ShowcaseSection";
import HighlightsSection from "../components/HighlightsSection";
import LastSection from "../components/LastSection";
export default function Home() {
  return (
    <div>
      <div>
        <HeroSection />
      </div>
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
  );
}
