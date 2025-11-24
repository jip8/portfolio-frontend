import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { SkillFlat } from "@/api/generated";
import { skillsApi } from "@/api";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SkillsSelectorProps {
  selectedSkills: SkillFlat[];
  onChange: (skills: SkillFlat[]) => void;
}

export function SkillsSelector({ selectedSkills = [], onChange }: SkillsSelectorProps) {
  const [availableSkills, setAvailableSkills] = useState<SkillFlat[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const response = await skillsApi.skillsGet();
        const skillsArray = Array.isArray(response.data)
          ? response.data
          : (response.data as any).items || [];
        setAvailableSkills(skillsArray);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const addSkill = (skill: SkillFlat) => {
    if (!selectedSkills.find((s) => s.id === skill.id)) {
      onChange([...selectedSkills, skill]);
    }
    setOpen(false);
  };

  const removeSkill = (skillId: number) => {
    onChange(selectedSkills.filter((s) => s.id !== skillId));
  };

  const unselectedSkills = availableSkills.filter(
    (skill) => !selectedSkills.find((s) => s.id === skill.id)
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold text-gray-100">Skills</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-gray-600 hover:bg-gray-600"
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar Skill
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0 bg-gray-800 border-gray-600" align="end">
            <Command className="bg-gray-800">
              <CommandInput
                placeholder="Buscar skill..."
                className="border-0 text-gray-200"
              />
              <CommandEmpty className="text-gray-400 text-center py-4">
                {loading ? "Carregando..." : "Nenhuma skill encontrada"}
              </CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-auto">
                {unselectedSkills.map((skill) => (
                  <CommandItem
                    key={skill.id}
                    onSelect={() => addSkill(skill)}
                    className="text-gray-200 hover:bg-gray-700 cursor-pointer"
                  >
                    <div>
                      <div className="font-medium">{skill.title}</div>
                      {skill.description && (
                        <div className="text-xs text-gray-400 truncate">
                          {skill.description}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedSkills.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4 border border-gray-700 border-dashed rounded-lg">
          Nenhuma skill selecionada
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 p-3 border border-gray-600 rounded-lg bg-gray-800/50">
          {selectedSkills.map((skill) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className="px-3 py-1.5 bg-gray-700 text-gray-100 hover:bg-gray-600"
            >
              <span className="mr-2">{skill.title}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="hover:text-primary transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
