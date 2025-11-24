import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { About } from "@/api/generated";

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
        <Label htmlFor="content">Conteúdo *</Label>
        <Textarea
          id="content"
          value={formData.content || ""}
          onChange={(e) => handleChange("content", e.target.value)}
          rows={10}
          required
        />
      </div>
    </div>
  );
}
