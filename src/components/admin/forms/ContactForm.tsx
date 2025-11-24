import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Contact } from "@/api/generated";

interface ContactFormProps {
  initialData?: Partial<Contact>;
  onChange: (data: Partial<Contact>) => void;
}

export function ContactForm({ initialData = {}, onChange }: ContactFormProps) {
  const [formData, setFormData] = useState<Partial<Contact>>(initialData);

  const handleChange = (field: keyof Contact, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="plataform">Plataforma *</Label>
        <Input
          id="plataform"
          value={formData.plataform || ""}
          onChange={(e) => handleChange("plataform", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="link">Link *</Label>
        <Input
          id="link"
          type="url"
          value={formData.link || ""}
          onChange={(e) => handleChange("link", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={formData.active || false}
          onCheckedChange={(checked) => handleChange("active", checked)}
        />
        <Label htmlFor="active">Ativo</Label>
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
  );
}
