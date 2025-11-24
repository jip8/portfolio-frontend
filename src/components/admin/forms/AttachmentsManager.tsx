import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, FileText, Download, Loader2, ImageIcon } from "lucide-react";
import { AttachmentResp } from "@/api/generated";
import { getAuthenticatedApis } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { AttachmentUploadModal } from "./AttachmentUploadModal";

interface AttachmentsManagerProps {
  attachments: AttachmentResp[];
  parentId: number | null;
  module: "projects" | "articles";
  onUpdate: () => void;
  thumbnailId?: number;
  onThumbnailChange?: (attachmentId: number | null) => void;
}

export function AttachmentsManager({
  attachments = [],
  parentId,
  module,
  onUpdate,
  thumbnailId,
  onThumbnailChange
}: AttachmentsManagerProps) {
  const { token } = useAuth();
  const [deleting, setDeleting] = useState<number | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleOpenUploadModal = () => {
    if (!parentId) {
      toast.error("Salve o registro antes de adicionar anexos");
      return;
    }
    setUploadModalOpen(true);
  };

  const handleUpload = async (file: File, title: string, description: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    if (description) {
      formData.append("description", description);
    }

    const apis = getAuthenticatedApis(token);
    const config = apis.projectsApi.configuration;
    const basePath = config?.basePath || "";

    const endpoint = module === "projects"
      ? `${basePath}/projects/${parentId}/attachments`
      : `${basePath}/articles/${parentId}/attachments`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao enviar anexo");
    }

    toast.success("Anexo enviado com sucesso!");
    onUpdate();
  };

  const handleDeleteAttachment = async (attachmentId: number) => {
    if (!parentId) return;

    setDeleting(attachmentId);
    try {
      const apis = getAuthenticatedApis(token);

      if (module === "projects") {
        await apis.projectsApi.projectsIdAttachmentsDelete(parentId);
      } else if (module === "articles") {
        await apis.articlesApi.articlesIdAttachmentsDelete(parentId);
      }

      toast.success("Anexo removido com sucesso!");
      onUpdate();
    } catch (error: any) {
      console.error("Error deleting attachment:", error);
      toast.error(error?.response?.data?.message || "Erro ao remover anexo");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <AttachmentUploadModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onUpload={handleUpload}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold text-gray-100">Anexos</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleOpenUploadModal}
            disabled={!parentId}
            className="border-gray-600 hover:bg-gray-600"
          >
            <Upload className="w-4 h-4 mr-1" />
            Upload Arquivo
          </Button>
        </div>

        {!parentId && (
          <p className="text-xs text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 rounded p-2">
            Salve o registro antes de adicionar anexos
          </p>
        )}

      {attachments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4 border border-gray-700 border-dashed rounded-lg">
          Nenhum anexo adicionado
        </p>
      ) : (
        <div className="space-y-2">
          {attachments.map((attachment) => {
            const isThumbnail = thumbnailId === attachment.id;
            return (
              <div
                key={attachment.id}
                className={`border rounded-lg p-3 ${
                  isThumbnail
                    ? "border-primary bg-primary/10"
                    : "border-gray-600 bg-gray-800/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-200 truncate">
                          {attachment.title}
                        </p>
                        {isThumbnail && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                            Thumbnail
                          </span>
                        )}
                      </div>
                      {attachment.description && (
                        <p className="text-xs text-gray-400 truncate">
                          {attachment.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    {onThumbnailChange && (
                      <Button
                        type="button"
                        variant={isThumbnail ? "default" : "ghost"}
                        size="sm"
                        onClick={() => onThumbnailChange(isThumbnail ? null : attachment.id)}
                        className={`h-8 w-8 p-0 ${!isThumbnail && "hover:bg-gray-700"}`}
                        title={isThumbnail ? "Remover thumbnail" : "Definir como thumbnail"}
                      >
                        <ImageIcon className={`w-4 h-4 ${isThumbnail ? "" : "text-gray-400"}`} />
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(attachment.link, "_blank")}
                      className="h-8 w-8 p-0 hover:bg-gray-700"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-gray-400" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAttachment(attachment.id)}
                      disabled={deleting === attachment.id}
                      className="h-8 w-8 p-0 hover:bg-gray-700"
                      title="Remover"
                    >
                      {deleting === attachment.id ? (
                        <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </>
  );
}
