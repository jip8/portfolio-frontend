import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { About } from "@/api/generated";
import Markdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AboutFormProps {
  initialData?: Partial<About>;
  onChange: (data: Partial<About>) => void;
}

export function AboutForm({ initialData = {}, onChange }: AboutFormProps) {
  const [formData, setFormData] = useState<Partial<About>>(initialData);

  const handleChange = (field: keyof About, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={formData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo * (Markdown)</Label>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Editar</TabsTrigger>
            <TabsTrigger value="preview">Pré-visualizar</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <Textarea
              id="content"
              value={formData.content || ""}
              onChange={(e) => handleChange("content", e.target.value)}
              rows={10}
              required
              placeholder="Escreva seu conteúdo em Markdown..."
            />
          </TabsContent>
          <TabsContent value="preview">
            <div className="min-h-[240px] p-4 bg-background rounded-md prose prose-sm dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 max-w-none">
              {formData.content ? (
                <Markdown>{formData.content}</Markdown>
              ) : (
                <p className="text-muted-foreground italic">Nada para pré-visualizar...</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
