import StatsSection from "../components/StatsSection";
import HeroSection from "../components/HeroSection.jsX";
import FeaturesSection from "../components/FeaturesSection";

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
    </div>
  );
}
