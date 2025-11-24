import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { apiConfig } from '@/api';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

const Curriculo = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [width, setWidth] = useState(typeof window !== 'undefined' && window.innerWidth < 768 ? 350 : 1000);

  useEffect(() => {
    const url = `${apiConfig.basePath}/attachments/curriculo.pdf`;
    setPdfUrl(url);
    setLoading(false);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function onDocumentLoadError(error: Error): void {
    setError(error.message);
  }

  function goToPrevPage() {
    setPageNumber(pageNumber - 1);
  }

  function goToNextPage() {
    setPageNumber(pageNumber + 1);
  }

  return (
    <div className="min-h-screen p-4 pt-16 md:p-12">
        {pdfUrl && (
          <div className="fixed top-4 right-4 z-50 flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-2 bg-background border border-border rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 shadow-lg">
              <ZoomOut className="h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground" />
              <Slider
                defaultValue={[width]}
                max={1600}
                min={400}
                step={100}
                onValueChange={(value) => setWidth(value[0])}
                className="w-24 lg:w-32 xl:w-40"
              />
              <ZoomIn className="h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground" />
            </div>
            <Button asChild size="sm" className="shadow-lg text-xs sm:text-sm whitespace-nowrap">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Download</span>
                <span className="sm:hidden">PDF</span>
              </a>
            </Button>
          </div>
        )}

        <div className="mb-8 md:mb-12 animate-fade-in">
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Meu Currículo</h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
                Uma visão detalhada da minha jornada profissional, acadêmica e das minhas habilidades.
              </p>
            </div>
          </div>
        </div>
      {loading && <Skeleton className="w-full h-[80vh]" />}
      {error && <p className="text-red-500">{error}</p>}
      {pdfUrl && (
        <>
          <div className="flex justify-center overflow-x-auto">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<Skeleton className="w-full h-[80vh]" />}
            >
              <Page
                pageNumber={pageNumber}
                width={width}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
          <div className="sticky bottom-0 z-10 bg-background py-2 flex justify-center items-center mt-4 gap-2 md:gap-4">
            <Button size="sm" onClick={goToPrevPage} disabled={pageNumber <= 1}>
              Anterior
            </Button>
            <span className="text-sm md:text-base">
              Página {pageNumber} de {numPages || '--'}
            </span>
            <Button size="sm" onClick={goToNextPage} disabled={pageNumber >= (numPages || 0)}>
              Próxima
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Curriculo;