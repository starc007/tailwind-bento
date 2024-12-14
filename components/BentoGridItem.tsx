import React from "react";
import { ResizableBox } from "react-resizable";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoGridItemProps {
  id: string;
  startCell: number;
  width: number;
  height: number;
  color: string;
  isActive: boolean;
  cellWidth: number;
  cellHeight: number;
  gap: number;
  columns: number;
  onResize: (width: number, height: number) => void;
  onRemove: () => void;
  onClick: (e: React.MouseEvent) => void;
}

const colorMap: Record<string, string> = {
  "bg-blue-200": "#BFDBFE",
  "bg-green-200": "#BBF7D0",
  "bg-purple-200": "#E9D5FF",
  "bg-yellow-200": "#FEF08A",
  "bg-pink-200": "#FBCFE8",
  "bg-indigo-200": "#C7D2FE",
  "bg-red-200": "#FECACA",
  "bg-orange-200": "#FED7AA",
};

function BentoGridItem({
  startCell,
  width,
  height,
  color,
  isActive,
  cellWidth,
  cellHeight,
  gap,
  columns,
  onResize,
  onRemove,
  onClick,
}: BentoGridItemProps) {
  console.log("BentoGridItem props:", { color, isActive, width, height });

  const x = startCell % columns;
  const y = Math.floor(startCell / columns);

  const left = x * (cellWidth + gap) + gap;
  const top = y * (cellHeight + gap) + gap;

  const handleResize = (
    _: React.SyntheticEvent,
    { size }: { size: { width: number; height: number } }
  ) => {
    const newWidth = Math.max(1, Math.round(size.width / (cellWidth + gap)));
    const newHeight = Math.max(1, Math.round(size.height / (cellHeight + gap)));
    onResize(newWidth, newHeight);
  };

  return (
    <div
      className="absolute"
      style={{
        left,
        top,
        zIndex: isActive ? 20 : 10,
      }}
      onClick={onClick}
    >
      <ResizableBox
        width={width * cellWidth + (width - 1) * gap}
        height={height * cellHeight + (height - 1) * gap}
        onResize={handleResize}
        draggableOpts={{ grid: [cellWidth + gap, cellHeight + gap] }}
        minConstraints={[cellWidth, cellHeight]}
      >
        <div
          className={cn(
            "rounded-lg w-full h-full group relative transition-colors cursor-pointer"
          )}
          style={{
            opacity: isActive ? 1 : 0.7,
            backgroundColor: colorMap[color] || "#BFDBFE",
          }}
        >
          <span className="absolute top-2 left-2 text-sm font-medium">
            Grid {startCell + 1}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded-full p-1 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </ResizableBox>
    </div>
  );
}

export default BentoGridItem;
