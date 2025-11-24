import { articlesApi } from "@/api";
import { ArticleResp } from "@/api/generated";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getAttachmentUrl = (link: string): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return `${baseUrl}/attachments/${link}`;
};

const getArticleThumbnail = (article: ArticleResp): string | null => {
  if (article.thumbnail) {
    return getAttachmentUrl(article.thumbnail);
  }
  if (article.attachments && article.attachments.length > 0) {
    return getAttachmentUrl(article.attachments[0].link);
  }
  return null;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export default function Artigos() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<ArticleResp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await articlesApi.articlesGet();
        setArticles(response.data.items || []);
      } catch (err) {
        setError("Falha ao carregar os artigos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen p-4 pt-16 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Artigos e Publicações</h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
            Pesquisas, estudos e materiais publicados
          </p>
        </div>

        <div className="space-y-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="overflow-hidden shadow-card transition-all duration-300">
                <div className="grid md:grid-cols-3 gap-6">
                  <Skeleton className="aspect-video md:aspect-square" />
                  <div className="md:col-span-2 p-6 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-8 w-full mb-3" />
                    <Skeleton className="h-12 w-full mb-4" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            articles.map((article, index) => (
              <Card
                key={article.id}
                className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 animate-slide-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/artigos/${article.id}`)}
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative aspect-video md:aspect-square overflow-hidden bg-muted">
                    {getArticleThumbnail(article) ? (
                      <img
                        src={getArticleThumbnail(article)!}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary">
                        <span className="text-muted-foreground text-sm">Sem imagem</span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 p-6 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.published_at)}
                      </span>
                      {article.local && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {article.local}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold mb-3 text-foreground hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 flex-grow">{article.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {article.skills?.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                        >
                          {skill.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
