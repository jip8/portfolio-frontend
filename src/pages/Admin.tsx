import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModulesColumn } from "@/components/admin/ModulesColumn";
import { ListColumn } from "@/components/admin/ListColumn";
import { RecordColumn } from "@/components/admin/RecordColumn";

export type Module =
  | "projetos"
  | "artigos"
  | "experiencias"
  | "skills"
  | "cursos"
  | "contatos"
  | "sobre";

export default function Admin() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setSelectedItemId(null);
  };

  const handleSelectItem = (id: number | null) => {
    setIsCreatingNew(false);
    setSelectedItemId(id);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950 dark:bg-black">
      {/* Header */}
      <header className="bg-gray-900 dark:bg-gray-950 border-b border-gray-700 dark:border-gray-800 px-6 py-4 flex items-center justify-between shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 dark:text-gray-200">
            Painel Administrativo
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Gerencie o conteúdo do seu portfólio
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="border-gray-600 hover:bg-gray-800">
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <ModulesColumn
          selectedModule={selectedModule}
          onSelectModule={(module) => {
            setSelectedModule(module);
            if (module === "skills") {
              setSelectedItemId(1);
            } else {
              setSelectedItemId(null);
            }
            setIsCreatingNew(false);
          }}
        />

        <ListColumn
          selectedModule={selectedModule}
          selectedItemId={selectedItemId}
          onSelectItem={handleSelectItem}
          onCreateNew={handleCreateNew}
          refreshTrigger={refreshTrigger}
        />

        <RecordColumn
          selectedModule={selectedModule}
          selectedItemId={selectedItemId}
          isCreatingNew={isCreatingNew}
          refreshTrigger={refreshTrigger}
          onUpdateComplete={handleRefresh}
          onCreateComplete={(newId) => {
            handleRefresh();
            setIsCreatingNew(false);
            setSelectedItemId(newId);
          }}
        />
      </div>
    </div>
  );
}
