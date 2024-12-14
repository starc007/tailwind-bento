import React from "react";
import { DEFAULT_GRID_SIZE } from "@/constants/bentoGrid";
import { COLORS } from "@/constants/bentoGrid";
import BentoInputs from "./BentoInputs";
import BentoGridItem from "./BentoGridItem";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import "react-resizable/css/styles.css";

const CONTAINER_WIDTH = 800;
const CONTAINER_HEIGHT = 600;
const GAP = 8;

interface BentoGridProps {
  onUpdate: (items: GridItem[], rows: number, columns: number) => void;
}

function BentoGrid({ onUpdate }: BentoGridProps) {
  const [rows, setRows] = React.useState(DEFAULT_GRID_SIZE.rows);
  const [columns, setColumns] = React.useState(DEFAULT_GRID_SIZE.columns);
  const [overlays, setOverlays] = React.useState<GridItem[]>([]);

  const cellWidth = Math.floor(
    (CONTAINER_WIDTH - GAP * (columns + 1)) / columns
  );
  const cellHeight = Math.floor((CONTAINER_HEIGHT - GAP * (rows + 1)) / rows);

  const handleAddOverlay = (cellIndex: number) => {
    // Check if there's already an overlay at this position
    const existingOverlay = overlays.find(
      (overlay) => overlay.startCell === cellIndex
    );

    if (existingOverlay) {
      // If exists, update isActive but preserve all other properties
      setOverlays((prev) =>
        prev.map((overlay) => ({
          ...overlay,
          isActive: overlay.id === existingOverlay.id,
        }))
      );
      return;
    }

    // If no overlay exists, create a new one
    const newOverlay: GridItem = {
      id: `overlay-${Date.now()}`,
      startCell: cellIndex,
      width: 1,
      height: 1,
      color: COLORS[overlays.length % COLORS.length],
      isActive: true,
    };

    setOverlays((prev) => [
      ...prev.map((overlay) => ({ ...overlay, isActive: false })),
      newOverlay,
    ]);
  };

  const handleRemoveOverlay = (id: string) => {
    setOverlays((prev) => prev.filter((overlay) => overlay.id !== id));
  };

  const handleResize = (id: string, newWidth: number, newHeight: number) => {
    setOverlays((prev) =>
      prev.map((overlay) =>
        overlay.id === id
          ? { ...overlay, width: newWidth, height: newHeight }
          : overlay
      )
    );
  };

  const handleOverlayClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOverlays((prev) =>
      prev.map((overlay) => {
        if (overlay.id === id) {
          return {
            ...overlay,
            isActive: true,
            color: overlay.color,
          };
        }
        return {
          ...overlay,
          isActive: false,
        };
      })
    );
  };

  React.useEffect(() => {
    onUpdate(overlays, rows, columns);
  }, [overlays, rows, columns, onUpdate]);

  return (
    <div className="flex flex-col gap-5">
      <BentoInputs
        rows={rows}
        columns={columns}
        setRows={setRows}
        setColumns={setColumns}
      />

      <p className="text-sm text-gray-500">
        Click on any box to start creating your layout.
      </p>
      <div
        className="bg-gray-50 rounded-lg relative"
        style={{
          width: CONTAINER_WIDTH,
          height: CONTAINER_HEIGHT,
          padding: GAP,
        }}
        onClick={() => {
          // Deactivate all overlays when clicking the background
          setOverlays((prev) =>
            prev.map((overlay) => ({ ...overlay, isActive: false }))
          );
        }}
      >
        {/* Base Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: GAP,
            height: "100%",
          }}
        >
          {Array.from({ length: rows * columns }).map((_, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-full flex flex-col gap-2"
              onClick={(e) => {
                e.stopPropagation();
                handleAddOverlay(index);
              }}
            >
              <span className="text-sm text-gray-500">{index + 1}</span>
              <Plus className="w-4 h-4" />
            </Button>
          ))}
        </div>

        {/* Overlays */}
        {overlays.map((overlay) => (
          <BentoGridItem
            key={overlay.id}
            {...overlay}
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            gap={GAP}
            columns={columns}
            onResize={(w, h) => handleResize(overlay.id, w, h)}
            onRemove={() => handleRemoveOverlay(overlay.id)}
            onClick={(e) => handleOverlayClick(overlay.id, e)}
          />
        ))}
      </div>
    </div>
  );
}

export default BentoGrid;
