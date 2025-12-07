import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { articlesApi } from "@/api";
import { ArticleResp } from "@/api/generated";
import { ArrowLeft, ExternalLink, Calendar, MapPin, Download, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { SkillBadge } from "@/components/SkillBadge";
import { ImageGallery } from "@/components/ImageGallery";
import Markdown from "react-markdown";

const getAttachmentUrl = (link: string): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return `${baseUrl}/attachments/${link}`;
};

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleResp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validImageIds, setValidImageIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await articlesApi.articlesIdGet(parseInt(id));
        setArticle(response.data);
      } catch (err) {
        setError("Falha ao carregar o artigo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleValidImagesDetected = useCallback((imageIds: Set<number>) => {
    setValidImageIds(imageIds);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-4 pt-16 md:p-12">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-24 w-full mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen p-4 pt-16 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-500 mb-4">{error || "Artigo não encontrado"}</p>
          <Button onClick={() => navigate("/artigos")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Artigos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pt-16 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/artigos")}
          className="mb-8 hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar aos Artigos
        </Button>

        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {article.title}
          </h1>

          {article.skills && article.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.skills.map((skill) => (
                <SkillBadge
                  key={skill.id}
                  title={skill.title}
                  description={skill.description}
                />
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
            {article.published_at && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(article.published_at).toLocaleDateString('pt-BR')}</span>
              </div>
            )}
            {article.local && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{article.local}</span>
              </div>
            )}
          </div>

          {article.description && (
            <div className="text-lg text-muted-foreground leading-relaxed prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 max-w-none">
              <Markdown>{article.description}</Markdown>
            </div>
          )}
        </div>

        {article.links && article.links.length > 0 && (
          <Card className="p-6 mb-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2" />
              Links Relacionados
            </h2>
            <div className="space-y-3">
              {article.links.map((link) => (
                <a
                  key={link.id}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between p-4 rounded-lg border border-border hover:border-primary transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.title}
                    </p>
                    {link.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {link.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {link.link}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </Card>
        )}

        {article.attachments && article.attachments.length > 0 && (
          <div className="mb-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <ImageGallery
              images={article.attachments}
              onValidImagesDetected={handleValidImagesDetected}
            />
          </div>
        )}

        {article.attachments && article.attachments.some(att => !validImageIds.has(att.id)) && (
          <Card className="p-6 mb-6 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Anexos
            </h2>
            <div className="grid gap-3">
              {article.attachments
                .filter(att => !validImageIds.has(att.id))
                .map((attachment) => (
                  <a
                    key={attachment.id}
                    href={getAttachmentUrl(attachment.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-4 rounded-lg border border-border hover:border-primary transition-colors group"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary mr-4 flex-shrink-0">
                      <FileText className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {attachment.title}
                      </p>
                      {attachment.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {attachment.description}
                        </p>
                      )}
                    </div>
                    <Download className="w-4 h-4 ml-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </a>
                ))}
            </div>
          </Card>
        )}

        <Separator className="my-8" />

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => navigate("/artigos")}
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ver Todos os Artigos
          </Button>
        </div>
      </div>
    </div>
  );
}
