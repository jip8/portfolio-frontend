import { Home, Briefcase, FileText, Award, Mail, ChevronsLeft, ChevronsRight, X } from "lucide-react";
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { title: "Início", url: "/", icon: Home },
  { title: "Projetos", url: "/projetos", icon: Briefcase },
  { title: "Artigos e Publicações", url: "/artigos", icon: FileText },
  { title: "Experiência", url: "/experiencia", icon: Award },
  { title: "Currículo", url: "/curriculo", icon: FileText },
];

const contactItems = [
  { title: "Email", icon: Mail, url: "mailto:pedro.lm.silva@hotmail.com" },
  { title: "GitHub", icon: FaGithub, url: "https://github.com/jip8" },
  { title: "LinkedIn", icon: FaLinkedin, url: "https://linkedin.com/in/pedro-lm-silva" },
  { title: "Instagram", icon: FaInstagram, url: "https://instagram.com/pedro_jip" },
  { title: "WhatsApp", icon: FaWhatsapp, url: "https://wa.me/05555997011177" },
];

function SidebarContent({ isCollapsed, setIsCollapsed, onNavClick }: { isCollapsed: boolean; setIsCollapsed: (val: boolean) => void; onNavClick?: () => void }) {
  return (
    <>
      <div className="border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center h-16 px-3">
          <div className="w-10 h-10 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Portfolio Logo"
              className="w-full h-full object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 ml-3">
              <h2 className="text-lg font-semibold text-sidebar-foreground truncate">
                Pedro Silva
              </h2>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                Desenvolvedor Full Stack
              </p>
            </div>
          )}
        </div>
        <div className="px-2 pb-2 hidden md:block">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`inline-flex items-center justify-center rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors h-10 ${
              isCollapsed ? "w-10" : "w-full"
            }`}
            aria-label={isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
          >
            {isCollapsed ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        <div className="px-2">
          <div className="h-6 mb-2 px-2 flex items-center">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
                Navegação
              </h3>
            )}
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                end
                onClick={onNavClick}
                className={({ isActive }) =>
                  `flex items-center rounded-md transition-colors h-10 ${
                    isCollapsed ? "w-10 justify-center" : "px-3"
                  } ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                  }`
                }
                title={isCollapsed ? item.title : undefined}
              >
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                {!isCollapsed && <span className="ml-3 whitespace-nowrap">{item.title}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-sidebar-border flex-shrink-0 py-4">
        <div className="px-2">
          <div className="h-6 mb-2 px-2 flex items-center">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
                Contatos
              </h3>
            )}
          </div>
          <nav className="space-y-1">
            {contactItems.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center rounded-md hover:bg-sidebar-accent/50 text-sidebar-foreground transition-colors h-10 ${
                  isCollapsed ? "w-10 justify-center" : "px-3"
                }`}
                title={isCollapsed ? item.title : undefined}
              >
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                {!isCollapsed && <span className="ml-3 whitespace-nowrap">{item.title}</span>}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

export function PortfolioSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { openMobile, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <>
      <div
        className={`border-r border-sidebar-border bg-sidebar flex flex-col h-screen sticky top-0 transition-all duration-300 overflow-x-hidden hidden md:flex ${
          isCollapsed ? "w-[60px]" : "w-64"
        }`}
      >
        <SidebarContent isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {isMobile && openMobile && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpenMobile(false)}
          />

          <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50 md:hidden">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setOpenMobile(false)}
                className="p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <SidebarContent isCollapsed={false} setIsCollapsed={() => {}} onNavClick={handleNavClick} />
          </div>
        </>
      )}
    </>
  );
}
