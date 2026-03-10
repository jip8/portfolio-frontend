import { useEffect, useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { AttachmentResp } from "@/api/generated";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Download, Eye, FileText, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface AttachmentListProps {
  attachments: AttachmentResp[];
  validImageIds: Set<number>;
  title?: string;
  className?: string;
  animationDelay?: string;
}

const getAttachmentUrl = (link: string): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return `${baseUrl}/attachments/${link}`;
};

export function AttachmentList({
  attachments,
  validImageIds,
  title = "Anexos",
  className,
  animationDelay,
}: AttachmentListProps) {
  const nonImageAttachments = useMemo(
    () => attachments.filter((attachment) => !validImageIds.has(attachment.id)),
    [attachments, validImageIds],
  );
  const [selectedPdf, setSelectedPdf] = useState<AttachmentResp | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(960);
  const [pdfAttachmentIds, setPdfAttachmentIds] = useState<Set<number>>(new Set());
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    let cancelled = false;

    const detectPdfAttachments = async () => {
      const detectedPdfIds = new Set<number>();

      await Promise.all(
        nonImageAttachments.map(async (attachment) => {
          try {
            const attachmentUrl = getAttachmentUrl(attachment.link);
            let response = await fetch(attachmentUrl, {
              method: "HEAD",
            });

            if (response.status === 405) {
              response = await fetch(attachmentUrl, {
                method: "GET",
              });
            }

            const contentType = response.headers.get("content-type")?.toLowerCase() || "";

            if (contentType.includes("application/pdf")) {
              detectedPdfIds.add(attachment.id);
            }
          } catch {
            const source = `${attachment.link} ${attachment.title}`.toLowerCase();
            if (source.includes(".pdf")) {
              detectedPdfIds.add(attachment.id);
            }
          }
        }),
      );

      if (!cancelled) {
        setPdfAttachmentIds(detectedPdfIds);
      }
    };

    detectPdfAttachments();

    return () => {
      cancelled = true;
    };
  }, [nonImageAttachments]);

  useEffect(() => {
    if (!selectedPdf) {
      return;
    }

    const updatePageWidth = () => {
      const viewportWidth = window.innerWidth;
      const horizontalPadding = viewportWidth < 640 ? 48 : 144;
      setPageWidth(Math.max(280, Math.min(1100, viewportWidth - horizontalPadding)));
    };

    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);

    return () => window.removeEventListener("resize", updatePageWidth);
  }, [selectedPdf]);

  if (nonImageAttachments.length === 0) {
    return null;
  }

  const selectedPdfUrl = selectedPdf ? getAttachmentUrl(selectedPdf.link) : "";

  return (
    <>
      <Card
        className={`p-6 mb-6 animate-scale-in ${className ?? ""}`.trim()}
        style={animationDelay ? { animationDelay } : undefined}
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          {title}
        </h2>
        <div className="grid gap-3">
          {nonImageAttachments.map((attachment) => {
            const isPdf = pdfAttachmentIds.has(attachment.id);

            if (isPdf) {
              return (
                <button
                  key={attachment.id}
                  type="button"
                  onClick={() => {
                    setSelectedPdf(attachment);
                    setPageNumber(1);
                    setNumPages(0);
                    setZoom(100);
                  }}
                  className="flex w-full items-start p-4 rounded-lg border border-border hover:border-primary transition-colors group text-left"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary mr-4 flex-shrink-0">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {attachment.title}
                    </p>
                    {attachment.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {attachment.description}
                      </p>
                    )}
                  </div>
                  <Eye className="w-4 h-4 ml-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </button>
              );
            }

            return (
              <a
                key={attachment.id}
                href={getAttachmentUrl(attachment.link)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start p-4 rounded-lg border border-border hover:border-primary transition-colors group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary mr-4 flex-shrink-0">
                  <FileText className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {attachment.title}
                  </p>
                  {attachment.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {attachment.description}
                    </p>
                  )}
                </div>
                <Download className="w-4 h-4 ml-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </a>
            );
          })}
        </div>
      </Card>

      <Dialog
        open={Boolean(selectedPdf)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPdf(null);
            setPageNumber(1);
            setNumPages(0);
            setZoom(100);
          }
        }}
      >
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-6xl h-[calc(100vh-1.5rem)] p-0 overflow-hidden gap-0">
          {selectedPdf && (
            <div className="grid h-full min-h-0 grid-rows-[auto,minmax(0,1fr),auto]">
              <DialogHeader className="shrink-0 border-b px-6 py-4 pr-14">
                <DialogTitle className="truncate">{selectedPdf.title}</DialogTitle>
                <DialogDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="truncate min-w-0">
                    {selectedPdf.description || "Visualização do PDF"}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <ZoomOut className="w-4 h-4 text-muted-foreground shrink-0" />
                      <Slider
                        value={[zoom]}
                        min={50}
                        max={200}
                        step={10}
                        onValueChange={(value) => setZoom(value[0])}
                        className="w-28 sm:w-36"
                      />
                      <ZoomIn className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground w-12 text-right">
                        {zoom}%
                      </span>
                    </div>
                    <Button asChild size="sm" variant="outline" className="shrink-0">
                      <a href={selectedPdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="min-h-0 overflow-auto overscroll-contain bg-muted/30 px-3 py-4 sm:px-6">
                <div className="flex min-h-full min-w-full items-start justify-center">
                  <div className="w-max max-w-none rounded-lg bg-background p-2 shadow-sm">
                    <Document
                      file={selectedPdfUrl}
                      onLoadSuccess={({ numPages: loadedPages }) => {
                        setNumPages(loadedPages);
                        setPageNumber(1);
                      }}
                      onLoadError={() => {
                        setNumPages(0);
                      }}
                      loading={<Skeleton className="h-[70vh] w-[min(1100px,70vw)]" />}
                    >
                      <Page
                        pageNumber={pageNumber}
                        width={Math.round((pageWidth * zoom) / 100)}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </Document>
                  </div>
                </div>
              </div>

              <div className="shrink-0 border-t bg-background px-4 py-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPageNumber((current) => Math.max(1, current - 1))}
                    disabled={pageNumber <= 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                  </Button>
                  <span className="text-sm text-muted-foreground min-w-28 text-center">
                    Pagina {pageNumber} de {numPages || "--"}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPageNumber((current) => Math.min(numPages, current + 1))}
                    disabled={!numPages || pageNumber >= numPages}
                  >
                    Proxima
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
