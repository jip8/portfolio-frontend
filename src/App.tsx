import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PortfolioSidebar } from "@/components/PortfolioSidebar";
import { MobileSidebarTrigger } from "@/components/MobileSidebarTrigger";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Projetos from "./pages/Projetos";
import ProjectDetail from "./pages/ProjectDetail";
import Artigos from "./pages/Artigos";
import ArticleDetail from "./pages/ArticleDetail";
import Experiencia from "./pages/Experiencia";
import NotFound from "./pages/NotFound";
import Curriculo from "./pages/Curriculo";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/*"
              element={
                <SidebarProvider>
                  <div className="flex min-h-screen w-full">
                    <PortfolioSidebar />
                    <main className="flex-1 overflow-auto relative">
                      <MobileSidebarTrigger />
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/projetos" element={<Projetos />} />
                        <Route path="/projetos/:id" element={<ProjectDetail />} />
                        <Route path="/artigos" element={<Artigos />} />
                        <Route path="/artigos/:id" element={<ArticleDetail />} />
                        <Route path="/experiencia" element={<Experiencia />} />
                        <Route path="/curriculo" element={<Curriculo />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </SidebarProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
