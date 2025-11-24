import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ExperienceFlat } from "@/api/generated";
import { SkillsSelector } from "./SkillsSelector";
import { Separator } from "@/components/ui/separator";

const toInputMonth = (dateStr?: string): string => {
  if (!dateStr) return "";
  const match = dateStr.match(/^(\d{2})-(\d{4})$/);
  if (match) {
    return `${match[2]}-${match[1]}`;
  }
  return dateStr;
};

const toApiMonth = (dateStr: string): string => {
  if (!dateStr) return "";
  const match = dateStr.match(/^(\d{4})-(\d{2})$/);
  if (match) {
    return `${match[2]}-${match[1]}`;
  }
  return dateStr;
};

interface ExperienceFormProps {
  initialData?: Partial<ExperienceFlat>;
  onChange: (data: Partial<ExperienceFlat>) => void;
}

export function ExperienceForm({ initialData = {}, onChange }: ExperienceFormProps) {
  const [formData, setFormData] = useState<Partial<ExperienceFlat>>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (field: keyof ExperienceFlat, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título (Empresa) *</Label>
          <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="function">Função *</Label>
          <Input
            id="function"
            value={formData.function || ""}
            onChange={(e) => handleChange("function", e.target.value)}
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initial_date">Data de Início</Label>
            <Input
              id="initial_date"
              type="month"
              value={toInputMonth(formData.initial_date)}
              onChange={(e) => handleChange("initial_date", toApiMonth(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end_date">Data de Término</Label>
            <Input
              id="end_date"
              type="month"
              value={toInputMonth(formData.end_date)}
              onChange={(e) => handleChange("end_date", toApiMonth(e.target.value))}
              disabled={formData.actual}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="actual"
            checked={formData.actual || false}
            onCheckedChange={(checked) => handleChange("actual", checked)}
          />
          <Label
            htmlFor="actual"
            className="text-sm font-normal cursor-pointer text-gray-200"
          >
            Trabalho atual (em andamento)
          </Label>
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
