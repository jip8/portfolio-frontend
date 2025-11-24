
import { AnnouncementCarousel } from "@/components/AnnouncementCarousel";
import { AboutSection } from "@/components/AboutSection";
import { Timeline } from "@/components/Timeline";
import { ProjectsPreview } from "@/components/ProjectsPreview";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto p-4 pt-16 md:p-12 lg:p-16">
        <section className="relative mb-12 md:mb-20 animate-fade-in">
          <AnnouncementCarousel />
          <AboutSection />
        </section>

        <div className="space-y-12 md:space-y-20">
          <Timeline />
          <ProjectsPreview />
        </div>
      </div>
    </div>
  );
};

export default Index;
