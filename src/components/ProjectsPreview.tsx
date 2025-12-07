import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { projectsApi } from "@/api";
import { useEffect, useState } from "react";
import { ProjectResp } from "@/api/generated";
import { Skeleton } from "./ui/skeleton";

const getAttachmentUrl = (link: string): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return `${baseUrl}/attachments/${link}`;
};

const getProjectThumbnail = (project: ProjectResp): string | null => {
  if (project.thumbnail) {
    return getAttachmentUrl(project.thumbnail);
  }
  return null;
};

const stripMarkdown = (markdown: string): string => {
  return markdown
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/__(.+?)__/g, '$1') // Remove bold (underscore)
    .replace(/_(.+?)_/g, '$1') // Remove italic (underscore)
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/>\s/g, '') // Remove blockquotes
    .replace(/[-*+]\s/g, '') // Remove list markers
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
};

const truncateText = (text: string, maxLength: number): string => {
  const stripped = stripMarkdown(text || '');
  if (stripped.length <= maxLength) return stripped;
  return stripped.substring(0, maxLength).trim() + '...';
};

export function ProjectsPreview() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectResp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectsApi.projectsGet();
        setProjects(response.data.items?.slice(0, 3) || []);
      } catch (err) {
        setError("Falha ao carregar os projetos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-8 md:py-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8 animate-fade-in">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Alguns dos Meus Trabalhos</h2>
        <Link to="/projetos">
          <Button variant="ghost" className="group">
            Ver mais
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="w-full aspect-video" />
              <div className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
              </div>
            </Card>
          ))
        ) : error ? (
          <div className="col-span-full text-center text-red-500">{error}</div>
        ) : (
          projects.map((project, index) => (
            <Card
              key={project.id}
              className="group overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 animate-scale-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/projetos/${project.id}`)}
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                {getProjectThumbnail(project) ? (
                  <img
                    src={getProjectThumbnail(project)!}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary">
                    <span className="text-muted-foreground text-sm">Sem imagem</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                {project.description && (
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {truncateText(project.description, 150)}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills?.slice(0, 3).map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                    >
                      {skill.title}
                    </span>
                  ))}
                  {project.skills && project.skills.length > 3 && (
                    <span className="px-3 py-1 text-xs font-medium text-muted-foreground">
                      +{project.skills.length - 3}
                    </span>
                  )}
                </div>
                <div className="text-sm text-primary font-medium group-hover:underline">
                  Ver mais →
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
