import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProjectFlat, AttachmentResp } from "@/api/generated";
import { LinksManager } from "./LinksManager";
import { SkillsSelector } from "./SkillsSelector";
import { AttachmentsManager } from "./AttachmentsManager";
import { Separator } from "@/components/ui/separator";
import Markdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const toInputDate = (dateStr?: string): string => {
  if (!dateStr) return "";
  const match = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (match) {
    return `${match[3]}-${match[2]}-${match[1]}`;
  }
  return dateStr;
};

const toApiDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    return `${match[3]}-${match[2]}-${match[1]}`;
  }
  return dateStr;
};

interface ProjectFormProps {
  initialData?: Partial<ProjectFlat>;
  onChange: (data: Partial<ProjectFlat>) => void;
  attachments?: AttachmentResp[];
  recordId?: number | null;
  onAttachmentsUpdate?: () => void;
}

export function ProjectForm({
  initialData = {},
  onChange,
  attachments = [],
  recordId = null,
  onAttachmentsUpdate = () => {}
}: ProjectFormProps) {
  const [formData, setFormData] = useState<Partial<ProjectFlat>>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (field: keyof ProjectFlat, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição (Markdown)</Label>
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Editar</TabsTrigger>
              <TabsTrigger value="preview">Pré-visualizar</TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                placeholder="Escreva a descrição em Markdown..."
              />
            </TabsContent>
            <TabsContent value="preview">
              <div className="min-h-[96px] p-4 bg-background rounded-md prose prose-sm dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 max-w-none">
                {formData.description ? (
                  <Markdown>{formData.description}</Markdown>
                ) : (
                  <p className="text-muted-foreground italic">Nada para pré-visualizar...</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label htmlFor="published_at">Data de Publicação</Label>
          <Input
            id="published_at"
            type="date"
            value={toInputDate(formData.published_at)}
            onChange={(e) => handleChange("published_at", toApiDate(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="revelance">Relevância</Label>
          <Input
            id="revelance"
            type="number"
            value={formData.revelance || 0}
            onChange={(e) => handleChange("revelance", parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <Separator className="bg-gray-600" />

      <LinksManager
        links={formData.links || []}
        onChange={(links) => handleChange("links", links)}
      />

      <Separator className="bg-gray-600" />

      <AttachmentsManager
        attachments={attachments}
        parentId={recordId}
        module="projects"
        onUpdate={onAttachmentsUpdate}
        thumbnailId={formData.thumbnail_id}
        onThumbnailChange={(id) => handleChange("thumbnail_id", id)}
      />

      <Separator className="bg-gray-600" />

      <SkillsSelector
        selectedSkills={formData.skills || []}
        onChange={(skills) => handleChange("skills", skills)}
      />
    </div>
  );
}
