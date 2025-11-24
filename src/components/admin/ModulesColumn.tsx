import { Module } from "@/pages/Admin";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  BookOpen,
  FolderGit2,
  Award,
  GraduationCap,
  Mail,
  User,
} from "lucide-react";

interface ModulesColumnProps {
  selectedModule: Module | null;
  onSelectModule: (module: Module) => void;
}

const modules = [
  { id: "projetos" as Module, label: "Projetos", icon: FolderGit2 },
  { id: "artigos" as Module, label: "Artigos", icon: BookOpen },
  { id: "experiencias" as Module, label: "Experiências", icon: Briefcase },
  { id: "skills" as Module, label: "Habilidades", icon: Award },
  { id: "cursos" as Module, label: "Cursos", icon: GraduationCap },
  { id: "contatos" as Module, label: "Contatos", icon: Mail },
  { id: "sobre" as Module, label: "Sobre", icon: User },
];

export function ModulesColumn({ selectedModule, onSelectModule }: ModulesColumnProps) {
  return (
    <div className="w-64 bg-gray-900 dark:bg-gray-950 border-r border-gray-700 dark:border-gray-800 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
          Módulos
        </h2>
        <nav className="space-y-1">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => onSelectModule(module.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                  selectedModule === module.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-gray-300 dark:text-gray-400 hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{module.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
