import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileSidebarTrigger() {
  const { openMobile, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();

  if (!isMobile || openMobile) {
    return null;
  }

  return (
    <button
      onClick={() => setOpenMobile(true)}
      className="fixed top-4 left-4 z-30 p-2 bg-background border border-border shadow-lg rounded-md hover:bg-accent transition-colors"
      aria-label="Abrir menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
