import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface SkillBadgeProps {
  title: string;
  description?: string;
}

export function SkillBadge({ title, description }: SkillBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const badgeRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!description) return;

    timeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 200);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!description) return;

    const rect = badgeRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPosition({
        x: e.clientX - rect.left + 10,
        y: e.clientY - rect.top + 10,
      });
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowTooltip(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={badgeRef} className="relative inline-block">
      <Badge
        variant="secondary"
        className="px-3 py-1.5 text-sm cursor-help hover:bg-primary hover:text-primary-foreground transition-colors"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {title}
      </Badge>

      {showTooltip && description && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          <div className="bg-popover text-popover-foreground px-3 py-2 text-xs rounded-md shadow-md border border-border max-w-[250px] animate-in fade-in-0 zoom-in-95">
            {description}
          </div>
        </div>
      )}
    </div>
  );
}
