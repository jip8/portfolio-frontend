import { useEffect, useState } from "react";
import { Module } from "@/pages/Admin";
import { getAuthenticatedApis } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Import forms
import { ProjectForm } from "./forms/ProjectForm";
import { ArticleForm } from "./forms/ArticleForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { ContactForm } from "./forms/ContactForm";
import { CourseForm } from "./forms/CourseForm";
import { AboutForm } from "./forms/AboutForm";
import { SkillsForm } from "./forms/SkillsForm";

interface RecordColumnProps {
  selectedModule: Module | null;
  selectedItemId: number | null;
  isCreatingNew: boolean;
  refreshTrigger: number;
  onUpdateComplete: () => void;
  onCreateComplete: (newId: number) => void;
}

export function RecordColumn({
  selectedModule,
  selectedItemId,
  isCreatingNew,
  refreshTrigger,
  onUpdateComplete,
  onCreateComplete,
}: RecordColumnProps) {
  const { token } = useAuth();
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (isCreatingNew) {
      setFormData({});
      return;
    }

    if (!selectedModule || (!selectedItemId && selectedModule !== "skills" && selectedModule !== "sobre")) {
      setFormData({});
      return;
    }

    const fetchRecord = async () => {
      setLoading(true);
      try {
        const apis = getAuthenticatedApis(token);
        let data: any = null;

        switch (selectedModule) {
          case "projetos":
            const project = await apis.projectsApi.projectsIdGet(selectedItemId);
            data = project.data;
            break;
          case "artigos":
            const article = await apis.articlesApi.articlesIdGet(selectedItemId);
            data = article.data;
            break;
          case "experiencias":
            const experience = await apis.experiencesApi.experiencesIdGet(
              selectedItemId
            );
            data = experience.data;
            break;
          case "skills":
            const skillsList = await apis.skillsApi.skillsGet();
            data = {
              items: Array.isArray(skillsList.data)
                ? skillsList.data
                : (skillsList.data as any).items || [],
            };
            break;
          case "cursos":
            const course = await apis.coursesApi.coursesIdGet(selectedItemId);
            data = course.data;
            break;
          case "contatos":
            const contact = await apis.contactsApi.contactsIdGet(selectedItemId);
            data = contact.data;
            break;
          case "sobre":
            try {
              const about = await apis.aboutApi.aboutGet();
              data = about.data;
            } catch {
              data = {};
            }
            break;
        }

        setFormData(data || {});
      } catch (error) {
        console.error("Error fetching record:", error);
        toast.error("Erro ao carregar registro");
        setFormData({});
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [selectedModule, selectedItemId, isCreatingNew, token, refreshTrigger]);

  const handleSave = async () => {
    if (!selectedModule) return;

    setSaving(true);
    try {
      const apis = getAuthenticatedApis(token);
      let response: any;

      if (isCreatingNew) {
        switch (selectedModule) {
          case "projetos":
            response = await apis.projectsApi.projectsPost(formData);
            break;
          case "artigos":
            response = await apis.articlesApi.articlesPost(formData);
            break;
          case "experiencias":
            response = await apis.experiencesApi.experiencesPost(formData);
            break;
          case "cursos":
            response = await apis.coursesApi.coursesPost(formData);
            break;
          case "contatos":
            response = await apis.contactsApi.contactsPost(formData);
            break;
          case "sobre":
            response = await apis.aboutApi.aboutPut(formData);
            break;
        }

        toast.success("Registro criado com sucesso!");
        onCreateComplete(response?.data?.id || 1);
      } else if (selectedItemId || selectedModule === "skills") {
        switch (selectedModule) {
          case "projetos":
            await apis.projectsApi.projectsIdPut(selectedItemId!, formData);
            break;
          case "artigos":
            await apis.articlesApi.articlesIdPut(selectedItemId!, formData);
            break;
          case "experiencias":
            await apis.experiencesApi.experiencesIdPut(selectedItemId!, formData);
            break;
          case "skills":
            await apis.skillsApi.skillsPut(formData);
            break;
          case "cursos":
            await apis.coursesApi.coursesIdPut(selectedItemId!, formData);
            break;
          case "contatos":
            await apis.contactsApi.contactsIdPut(selectedItemId!, formData);
            break;
          case "sobre":
            await apis.aboutApi.aboutPut(formData);
            break;
        }

        toast.success("Registro atualizado com sucesso!");
        onUpdateComplete();
      }
    } catch (error: any) {
      console.error("Error saving record:", error);
      toast.error(error?.response?.data?.message || "Erro ao salvar registro");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedModule || !selectedItemId) return;

    setSaving(true);
    try {
      const apis = getAuthenticatedApis(token);

      switch (selectedModule) {
        case "projetos":
          await apis.projectsApi.projectsIdDelete(selectedItemId);
          break;
        case "artigos":
          await apis.articlesApi.articlesIdDelete(selectedItemId);
          break;
        case "experiencias":
          await apis.experiencesApi.experiencesIdDelete(selectedItemId);
          break;
        case "cursos":
          await apis.coursesApi.coursesIdDelete(selectedItemId);
          break;
        case "contatos":
          await apis.contactsApi.contactsIdDelete(selectedItemId);
          break;
      }

      toast.success("Registro excluído com sucesso!");
      setShowDeleteDialog(false);
      onUpdateComplete();
    } catch (error: any) {
      console.error("Error deleting record:", error);
      toast.error(error?.response?.data?.message || "Erro ao excluir registro");
    } finally {
      setSaving(false);
    }
  };

  const handleAttachmentsUpdate = () => {
    onUpdateComplete();
  };

  const renderForm = () => {
    if (!selectedModule) return null;

    switch (selectedModule) {
      case "projetos":
        return (
          <ProjectForm
            initialData={formData}
            onChange={setFormData}
            attachments={formData.attachments || []}
            recordId={selectedItemId}
            onAttachmentsUpdate={handleAttachmentsUpdate}
          />
        );
      case "artigos":
        return (
          <ArticleForm
            initialData={formData}
            onChange={setFormData}
            attachments={formData.attachments || []}
            recordId={selectedItemId}
            onAttachmentsUpdate={handleAttachmentsUpdate}
          />
        );
      case "experiencias":
        return <ExperienceForm initialData={formData} onChange={setFormData} />;
      case "contatos":
        return <ContactForm initialData={formData} onChange={setFormData} />;
      case "cursos":
        return <CourseForm initialData={formData} onChange={setFormData} />;
      case "sobre":
        return <AboutForm initialData={formData} onChange={setFormData} />;
      case "skills":
        return <SkillsForm initialData={formData} onChange={setFormData} />;
      default:
        return null;
    }
  };

  if (!selectedModule) {
    return (
      <div className="flex-1 bg-gray-700 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-gray-300 dark:text-gray-400 mb-2 font-medium">
            Selecione um módulo
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Escolha um módulo para começar a gerenciar seus dados
          </p>
        </div>
      </div>
    );
  }

  if (!selectedItemId && !isCreatingNew && selectedModule !== "skills" && selectedModule !== "sobre") {
    return (
      <div className="flex-1 bg-gray-700 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-gray-300 dark:text-gray-400 mb-2 font-medium">
            {isCreatingNew ? "Criando novo registro" : "Selecione um item"}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {isCreatingNew
              ? "Preencha o formulário abaixo"
              : "Escolha um item da lista para visualizar ou editar"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 bg-gray-700 dark:bg-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-600 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-100 dark:text-gray-200">
              {selectedModule === "skills"
                ? "Gerenciar Skills"
                : isCreatingNew
                  ? "Novo Registro"
                  : "Editar Registro"}
            </h2>
            <div className="flex gap-2">
              {!isCreatingNew && selectedModule !== "sobre" && selectedModule !== "skills" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={saving}
                  className="border-gray-500 hover:bg-gray-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              )}
              <Button size="sm" onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              renderForm()
            )}
          </div>
        </ScrollArea>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O registro será permanentemente
              excluído.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={saving}>
              {saving ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
