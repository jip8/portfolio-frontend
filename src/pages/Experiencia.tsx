import { experiencesApi } from "@/api";
import { ExperienceResp } from "@/api/generated";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

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

export default function Experiencia() {
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
    <div className="min-h-screen p-4 pt-16 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Experiência Profissional</h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
            Minha trajetória no desenvolvimento de software
          </p>
        </div>

        <div className="space-y-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-8 shadow-card">
                <div className="flex items-start gap-4 mb-4">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <div className="flex-grow">
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
                <Skeleton className="h-16 w-full mb-6" />
                <div>
                  <Skeleton className="h-4 w-1/4 mb-3" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </div>
              </Card>
            ))
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            experiences.map((exp, index) => (
              <Card
                key={exp.id}
                className="p-8 shadow-card hover:shadow-hover transition-all duration-300 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-foreground mb-2">{exp.function}</h2>
                    <p className="text-lg font-medium text-primary mb-2">{exp.title}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatPeriod(exp.initial_date, exp.end_date, exp.actual)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-muted-foreground mb-6 prose prose-base dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 max-w-none">
                  <Markdown>{exp.description}</Markdown>
                </div>

                {exp.skills && exp.skills.length > 0 &&
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Tecnologias:</h3>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                        >
                          {skill.title}
                        </span>
                      ))}
                    </div>
                  </div>
                }
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
