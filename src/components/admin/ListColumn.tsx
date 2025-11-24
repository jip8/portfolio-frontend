import { useEffect, useState } from "react";
import { Module } from "@/pages/Admin";
import { cn } from "@/lib/utils";
import {
  projectsApi,
  articlesApi,
  experiencesApi,
  skillsApi,
  coursesApi,
  contactsApi,
  aboutApi,
} from "@/api";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ListColumnProps {
  selectedModule: Module | null;
  selectedItemId: number | null;
  onSelectItem: (id: number | null) => void;
  onCreateNew: () => void;
  refreshTrigger: number;
}

interface ListItem {
  id: number;
  title: string;
  subtitle?: string;
}

export function ListColumn({
  selectedModule,
  selectedItemId,
  onSelectItem,
  onCreateNew,
  refreshTrigger,
}: ListColumnProps) {
  const [items, setItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedModule) {
      setItems([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        let data: ListItem[] = [];

        switch (selectedModule) {
          case "projetos":
            const projects = await projectsApi.projectsGet();
            data =
              projects.data.items?.map((p) => ({
                id: p.id,
                title: p.title,
                subtitle: p.description,
              })) || [];
            break;
          case "artigos":
            const articles = await articlesApi.articlesGet();
            data =
              articles.data.items?.map((a) => ({
                id: a.id,
                title: a.title,
                subtitle: a.description,
              })) || [];
            break;
          case "experiencias":
            const experiences = await experiencesApi.experiencesGet();
            data =
              experiences.data.items?.map((e) => ({
                id: e.id,
                title: e.title,
                subtitle: e.description,
              })) || [];
            break;
          case "skills":
            const skills = await skillsApi.skillsGet();
            const skillsArray = Array.isArray(skills.data)
              ? skills.data
              : (skills.data as any).items || [];
            data = [
              {
                id: 1,
                title: "Todas as Skills",
                subtitle: `${skillsArray.length} skills cadastradas`,
              },
            ];
            break;
          case "cursos":
            const courses = await coursesApi.coursesGet();
            data =
              courses.data.items?.map((c) => ({
                id: c.id,
                title: c.title,
                subtitle: c.description,
              })) || [];
            break;
          case "contatos":
            const contacts = await contactsApi.contactsGet();
            data =
              contacts.data.items?.map((c) => ({
                id: c.id!,
                title: c.plataform,
                subtitle: c.link,
              })) || [];
            break;
          case "sobre":
            try {
              const about = await aboutApi.aboutGet();
              data = [
                {
                  id: 1,
                  title: about.data.title || "Sobre",
                  subtitle: "Informações pessoais",
                },
              ];
            } catch {
              data = [];
            }
            break;
        }

        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedModule, refreshTrigger]);

  if (!selectedModule) {
    return (
      <div className="w-80 bg-gray-800 dark:bg-gray-900 border-r border-gray-600 dark:border-gray-700 flex items-center justify-center">
        <p className="text-gray-400 dark:text-gray-500 text-center px-4">
          Selecione um módulo para ver a listagem
        </p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-800 dark:bg-gray-900 border-r border-gray-600 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-600 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-300 dark:text-gray-400 uppercase tracking-wide">
            Itens
          </h2>
          {selectedModule !== "skills" && !(selectedModule === "sobre" && items.length > 0) && (
            <Button size="sm" variant="outline" onClick={onCreateNew} className="border-gray-600 hover:bg-gray-700">
              <Plus className="w-4 h-4 mr-1" />
              Novo
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i}>
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 dark:text-gray-500 text-center px-4">
              Nenhum item encontrado
            </p>
          </div>
        ) : (
          <div className="p-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg mb-2 transition-all",
                  selectedItemId === item.id
                    ? "bg-gray-700 dark:bg-gray-800 shadow-lg border-2 border-primary"
                    : "bg-gray-800/50 dark:bg-gray-900/50 hover:bg-gray-700 dark:hover:bg-gray-800 border-2 border-transparent"
                )}
              >
                <h3 className="font-medium text-gray-100 dark:text-gray-200 truncate">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-sm text-gray-400 dark:text-gray-500 truncate mt-1">
                    {item.subtitle}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
