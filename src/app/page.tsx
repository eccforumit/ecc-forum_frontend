import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { TeamSection } from "@/components/home/TeamSection";
import { TimelineSection } from "@/components/home/TimelineSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { PerformanceSection } from "@/components/home/PerformanceSection";
import { ContactSection } from "@/components/home/ContactSection";
import { RecapVideoSection } from "@/components/home/RecapVideoSection";
import { MotionSection } from "@/components/ui/MotionSection";

export default function Home() {
  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-24 left-0 w-72 h-72 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-96 right-0 w-80 h-80 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <HeroSection />
      <MotionSection id="a-propos" delay={0.1}>
        <AboutSection />
      </MotionSection>
      <MotionSection id="equipe" delay={0.2}>
        <TeamSection />
      </MotionSection>
      <MotionSection id="programme" delay={0.2}>
        <TimelineSection />
      </MotionSection>
      <MotionSection id="partenaires" delay={0.3}>
        <PartnersSection />
      </MotionSection>
      <MotionSection id="performances" delay={0.2}>
        <PerformanceSection />
      </MotionSection>
        <MotionSection id="recap-video" delay={0}>
            <RecapVideoSection />
        </MotionSection>
      <MotionSection id="contact" delay={0.1}>
        <ContactSection />
      </MotionSection>
    </div>
  );
}