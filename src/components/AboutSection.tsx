import { aboutApi } from "@/api";
import { About } from "@/api/generated";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { TypewriterEffect } from "./TypewriterEffect";
import Markdown from "react-markdown";

export function AboutSection() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const response = await aboutApi.aboutGet();
        setAbout(response.data);
      } catch (err) {
        setError("Falha ao carregar informações.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <>
      <div className="hidden xl:block absolute bottom-4 right-0 w-[420px] h-[480px] 2xl:w-[450px] 2xl:h-[520px] z-30 animate-scale-in">
        <img
          src="/portfolio_hello.png"
          alt="Ilustração"
          className="w-full h-full object-contain"
          style={{
            filter: 'drop-shadow(0px 0px 0px hsl(var(--border))) drop-shadow(0px 0px 1px hsl(var(--border))) drop-shadow(0px 0px 2px hsl(var(--border))) drop-shadow(0px 0px 3px hsl(var(--border))) drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))'
          }}
        />
      </div>

      <div className="mt-8 space-y-2 md:space-y-3 animate-fade-in xl:pr-[450px] 2xl:pr-[480px]">
        {loading ? (
          <>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : about ? (
          <>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Pedro Lucas <br /> Martins da Silva
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium bg-gradient-primary bg-clip-text text-transparent min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem] lg:min-h-[3.5rem]">
              <TypewriterEffect
                words={about.title.split(',').map(word => word.trim())}
                className="bg-gradient-primary bg-clip-text text-transparent"
              />
            </h2>
            <div className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl prose prose-sm sm:prose-base md:prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4">
              <Markdown>{about.content}</Markdown>
            </div>

            <div className="xl:hidden flex justify-center pt-6 pb-4 animate-scale-in">
              <img
                src="/portfolio_hello.png"
                alt="Ilustração"
                className="w-auto h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] max-w-full object-contain"
                style={{
                  filter: 'drop-shadow(0px 0px 0px hsl(var(--border))) drop-shadow(0px 0px 1px hsl(var(--border))) drop-shadow(0px 0px 2px hsl(var(--border))) drop-shadow(0px 0px 3px hsl(var(--border))) drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))'
                }}
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
