import StatsSection from "../components/StatsSection";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";

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
    
  );
}
