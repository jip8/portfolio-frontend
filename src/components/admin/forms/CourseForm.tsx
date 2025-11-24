import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CourseFlat } from "@/api/generated";
import { SkillsSelector } from "./SkillsSelector";
import { Separator } from "@/components/ui/separator";

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

interface CourseFormProps {
  initialData?: Partial<CourseFlat>;
  onChange: (data: Partial<CourseFlat>) => void;
}

export function CourseForm({ initialData = {}, onChange }: CourseFormProps) {
  const [formData, setFormData] = useState<Partial<CourseFlat>>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (field: keyof CourseFlat, value: any) => {
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
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="concluded_at">Data de Conclusão</Label>
          <Input
            id="concluded_at"
            type="date"
            value={toInputDate(formData.concluded_at)}
            onChange={(e) => handleChange("concluded_at", toApiDate(e.target.value))}
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

      <SkillsSelector
        selectedSkills={formData.skills || []}
        onChange={(skills) => handleChange("skills", skills)}
      />
    </div>
  );
}
