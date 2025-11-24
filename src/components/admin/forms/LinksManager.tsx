import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { LinkFlat } from "@/api/generated";

interface LinksManagerProps {
  links: LinkFlat[];
  onChange: (links: LinkFlat[]) => void;
}

export function LinksManager({ links = [], onChange }: LinksManagerProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const addLink = () => {
    const newLink: LinkFlat = {
      id: 0,
      title: "",
      link: "",
      description: "",
      revelance: 0,
    };
    onChange([...links, newLink]);
    setExpanded(links.length);
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    onChange(newLinks);
    if (expanded === index) {
      setExpanded(null);
    }
  };

  const updateLink = (index: number, field: keyof LinkFlat, value: any) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange(newLinks);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold text-gray-100">Links</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addLink}
          className="border-gray-600 hover:bg-gray-600"
        >
          <Plus className="w-4 h-4 mr-1" />
          Adicionar Link
        </Button>
      </div>

      {links.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">
          Nenhum link adicionado
        </p>
      ) : (
        <div className="space-y-2">
          {links.map((link, index) => (
            <div
              key={index}
              className="border border-gray-600 rounded-lg p-3 bg-gray-800/50"
            >
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  className="flex-1 text-left text-sm font-medium text-gray-200 hover:text-primary transition-colors"
                >
                  {link.title || `Link ${index + 1}`}
                  {link.link && (
                    <span className="ml-2 text-xs text-gray-400">
                      ({link.link})
                    </span>
                  )}
                </button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLink(index)}
                  className="h-8 w-8 p-0 hover:bg-gray-700"
                >
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </Button>
              </div>

              {expanded === index && (
                <div className="space-y-3 mt-3 pt-3 border-t border-gray-600">
                  <div className="space-y-2">
                    <Label htmlFor={`link-title-${index}`} className="text-gray-300">
                      Título
                    </Label>
                    <Input
                      id={`link-title-${index}`}
                      value={link.title || ""}
                      onChange={(e) => updateLink(index, "title", e.target.value)}
                      placeholder="Nome do link"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`link-url-${index}`} className="text-gray-300">
                      URL *
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id={`link-url-${index}`}
                        value={link.link || ""}
                        onChange={(e) => updateLink(index, "link", e.target.value)}
                        placeholder="https://..."
                        type="url"
                        className="flex-1"
                      />
                      {link.link && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(link.link, "_blank")}
                          className="border-gray-600"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`link-description-${index}`} className="text-gray-300">
                      Descrição
                    </Label>
                    <Textarea
                      id={`link-description-${index}`}
                      value={link.description || ""}
                      onChange={(e) => updateLink(index, "description", e.target.value)}
                      placeholder="Descrição do link"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`link-revelance-${index}`} className="text-gray-300">
                      Relevância
                    </Label>
                    <Input
                      id={`link-revelance-${index}`}
                      type="number"
                      value={link.revelance || 0}
                      onChange={(e) =>
                        updateLink(index, "revelance", parseInt(e.target.value) || 0)
                      }
                      min={0}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
