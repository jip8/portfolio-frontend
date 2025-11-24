import { experiencesApi } from "@/api";
import { ExperienceResp } from "@/api/generated";
import { Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const formatPeriod = (startDate?: string, endDate?: string, isActual?: boolean) => {
  const format = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr; // Retorna o valor original se não for uma data válida
    return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  };

  const start = startDate ? format(startDate) : '';
  const end = isActual ? "Presente" : (endDate ? format(endDate) : '');
  if (!start) return '';
  return `${start} - ${end}`;
};

export function Timeline() {
  const [experiences, setExperiences] = useState<ExperienceResp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await experiencesApi.experiencesGet();
        setExperiences(response.data.items || []);
      } catch (err) {
        setError("Falha ao carregar as experiências.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <section className="py-8 md:py-16">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 animate-fade-in">
        Minha Trajetória
      </h2>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

        <div className="space-y-12">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="relative pl-20 md:pl-0">
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}>
                  <div className="bg-card p-6 rounded-lg shadow-card border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="w-5 h-5" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2 mb-3" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 top-6 w-4 h-4 bg-muted-foreground rounded-full border-4 border-background -translate-x-1/2 z-10" />
              </div>
            ))
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="relative pl-20 md:pl-0 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}>
                  <div className="bg-card p-6 rounded-lg shadow-card hover:shadow-hover transition-all duration-300 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {formatPeriod(exp.initial_date, exp.end_date, exp.actual)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{exp.function}</h3>
                    <p className="text-muted-foreground font-medium mb-3">{exp.title}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1/2 z-10" />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
