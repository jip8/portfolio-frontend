import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const announcements = [
  {
    id: 1,
    title: "Meus Projetos",
    description: "Confira meu portfólio completo de projetos em desenvolvimento",
    badge: "Portfólio",
    backgroundImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    link: "/projetos",
  },
  {
    id: 2,
    title: "Artigos e Publicações",
    description: "Leia meus artigos sobre desenvolvimento",
    badge: "Publicações Acadêmicas",
    backgroundImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    link: "/artigos",
  },
  {
    id: 3,
    title: "Experiência Profissional",
    description: "Conheça minha trajetória e experiência no desenvolvimento de software",
    badge: "Carreira",
    backgroundImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    link: "/experiencia",
  },
];

export function AnnouncementCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div className="relative w-full h-[50vh] min-h-[350px] md:h-[60vh] md:min-h-[500px] md:mr-auto md:max-w-full lg:max-w-[95%]">
      <Link to={announcements[currentIndex].link} className="block h-full group">
        <Card className="relative h-full p-4 md:p-8 lg:p-12 shadow-card overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]">
          <div className="absolute inset-0 transition-opacity duration-1000">
            {announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={announcement.backgroundImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              </div>
            ))}
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between max-w-2xl pointer-events-none">
            <div className="space-y-2 md:space-y-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                {announcements[currentIndex].badge}
              </span>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 group-hover:text-primary-glow transition-colors">
                {announcements[currentIndex].title}
              </h3>
              <p className="text-base md:text-lg lg:text-xl text-white/90">
                {announcements[currentIndex].description}
              </p>
              <div className="pt-2 md:pt-4">
                <span className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-white/80 group-hover:text-white transition-colors">
                  Ver mais
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 pointer-events-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  goToPrevious();
                }}
                className="hover:bg-white/20 text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {announcements.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-white"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  goToNext();
                }}
                className="hover:bg-white/20 text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
