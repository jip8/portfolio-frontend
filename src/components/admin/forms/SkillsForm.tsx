import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { SkillFlat } from "@/api/generated";

interface SkillsFormProps {
  initialData?: { items?: SkillFlat[] };
  onChange: (data: SkillFlat[]) => void;
}

export function SkillsForm({ initialData = {}, onChange }: SkillsFormProps) {
  const [skills, setSkills] = useState<SkillFlat[]>(initialData.items || []);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (initialData.items) {
      setSkills(initialData.items);
      setDeletedIds([]);
    }
  }, [initialData]);

  const notifyChange = (updatedSkills: SkillFlat[], deleted: number[]) => {
    const deletedSkills = deleted.map(id => ({
      id: -id,
      title: "",
      description: "",
      revelance: 0,
    }));

    onChange([...updatedSkills, ...deletedSkills]);
  };

  const addSkill = () => {
    const newSkill: SkillFlat = {
      id: 0,
      title: "",
      description: "",
      revelance: 0,
    };
    const newSkills = [...skills, newSkill];
    setSkills(newSkills);
    notifyChange(newSkills, deletedIds);
    setExpanded(skills.length);
  };

  const removeSkill = (index: number) => {
    const skill = skills[index];
    const newSkills = skills.filter((_, i) => i !== index);

    let newDeletedIds = deletedIds;
    if (skill.id && skill.id > 0) {
      newDeletedIds = [...deletedIds, skill.id];
      setDeletedIds(newDeletedIds);
    }

    setSkills(newSkills);
    notifyChange(newSkills, newDeletedIds);

    if (expanded === index) {
      setExpanded(null);
    }
  };

  const updateSkill = (index: number, field: keyof SkillFlat, value: any) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setSkills(newSkills);
    notifyChange(newSkills, deletedIds);
  };

  const displaySkills = [...skills].map((skill, index) => ({ ...skill, originalIndex: index }));
  displaySkills.sort((a, b) => (b.revelance || 0) - (a.revelance || 0));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-100">
            Gerenciar Skills
          </h3>
          <p className="text-sm text-gray-400">
            Adicione, edite ou remova skills. Total: {skills.length}
          </p>
        </div>
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={addSkill}
        >
          <Plus className="w-4 h-4 mr-1" />
          Nova Skill
        </Button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-600 rounded-lg">
          <p className="text-gray-400 mb-4">Nenhuma skill cadastrada</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSkill}
            className="border-gray-600 hover:bg-gray-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Adicionar Primeira Skill
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {displaySkills.map((skillWithIndex) => {
            const skill = skillWithIndex;
            const actualIndex = skillWithIndex.originalIndex;

            return (
              <div
                key={`skill-${actualIndex}`}
                className="border border-gray-600 rounded-lg p-4 bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-gray-500 cursor-move">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setExpanded(expanded === actualIndex ? null : actualIndex)}
                        className="flex-1 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-100">
                            {skill.title || `Nova Skill`}
                          </h4>
                          {skill.id !== undefined && skill.id > 0 && (
                            <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-300">
                              ID: {skill.id}
                            </span>
                          )}
                          {skill.id === 0 && (
                            <span className="text-xs px-2 py-0.5 rounded bg-green-900/30 text-green-400 font-medium">
                              NOVA
                            </span>
                          )}
                          {skill.revelance !== undefined && skill.revelance > 0 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                              Relevância: {skill.revelance}
                            </span>
                          )}
                        </div>
                        {skill.description && (
                          <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                            {skill.description}
                          </p>
                        )}
                      </button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(actualIndex)}
                        className="h-8 w-8 p-0 hover:bg-gray-700 ml-2"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                      </Button>
                    </div>

                    {expanded === actualIndex && (
                      <div className="space-y-3 pt-3 border-t border-gray-600">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor={`skill-title-${actualIndex}`} className="text-gray-300">
                              Título *
                            </Label>
                            <Input
                              id={`skill-title-${actualIndex}`}
                              value={skill.title || ""}
                              onChange={(e) => updateSkill(actualIndex, "title", e.target.value)}
                              placeholder="Nome da skill"
                              className="bg-gray-800 border-gray-600"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`skill-revelance-${actualIndex}`} className="text-gray-300">
                              Relevância
                            </Label>
                            <Input
                              id={`skill-revelance-${actualIndex}`}
                              type="number"
                              value={skill.revelance || 0}
                              onChange={(e) =>
                                updateSkill(actualIndex, "revelance", parseInt(e.target.value) || 0)
                              }
                              min={0}
                              className="bg-gray-800 border-gray-600"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`skill-description-${actualIndex}`} className="text-gray-300">
                            Descrição
                          </Label>
                          <Textarea
                            id={`skill-description-${actualIndex}`}
                            value={skill.description || ""}
                            onChange={(e) => updateSkill(actualIndex, "description", e.target.value)}
                            placeholder="Descrição da skill"
                            rows={3}
                            className="bg-gray-800 border-gray-600"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {deletedIds.length > 0 && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-800/50 rounded-lg">
          <p className="text-sm text-red-400">
            <strong>{deletedIds.length}</strong> skill(s) marcada(s) para exclusão ao salvar
          </p>
        </div>
      )}

      <div className="mt-4 p-4 bg-gray-800/30 border border-gray-600/50 rounded-lg">
        <p className="text-xs text-gray-400">
          <strong className="text-gray-300">Nota:</strong> As alterações em skills afetam todas as
          referências em projetos, artigos, experiências e cursos. As skills são ordenadas por relevância
          automaticamente.
        </p>
      </div>
    </div>
  );
}
