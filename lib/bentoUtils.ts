const CONTAINER_WIDTH = 800; // Match the value from BentoGrid.tsx

export const generateTailwindCSS = (
  items: BentoItem[],
  rows: number,
  columns: number
): string => {
  return `<!-- Grid Container -->
<div class="grid grid-cols-1 md:grid-cols-${columns} grid-rows-${rows} gap-2 w-full max-w-[${CONTAINER_WIDTH}px] mx-auto">
${items
  .map(
    (item) =>
      `  <div class="col-start-1 md:col-start-${
        item.col
      } col-span-1 md:col-span-${item.width} row-start-${item.row} row-span-${
        item.height
      } ${item.color} rounded-lg shadow-lg p-4">
    <!-- Grid ${(item.row - 1) * columns + item.col} -->
  </div>`
  )
  .join("\n")}
</div>`;
};

export const generatePlainCSS = (
  items: BentoItem[],
  rows: number,
  columns: number
): string => {
  const colorMap: Record<string, string> = {
    "bg-blue-200": "#dbeafe",
    "bg-green-200": "#dcfce7",
    "bg-purple-200": "#f3e8ff",
    "bg-yellow-200": "#fef9c3",
    "bg-pink-200": "#fce7f3",
    "bg-indigo-200": "#e0e7ff",
    "bg-red-200": "#fee2e2",
    "bg-orange-200": "#ffedd5",
  };

  return `.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  padding: 8px;
  width: 100%;
  max-width: ${CONTAINER_WIDTH}px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
  }
}

${items
  .map(
    (item) =>
      `.grid-item-${item.id} {  /* Grid ${
        (item.row - 1) * columns + item.col
      } */
  grid-column: 1;
  grid-row: auto;
  background: ${colorMap[item.color as keyof typeof colorMap]};
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  padding: 1rem;
}

@media (min-width: 768px) {
  .grid-item-${item.id} {
    grid-column: ${item.col} / span ${item.width};
    grid-row: ${item.row} / span ${item.height};
  }
}`
  )
  .join("\n\n")}`;
};

export const generateFigmaConfig = (
  items: BentoItem[],
  rows: number,
  columns: number
): FigmaGridConfig => {
  const CELL_SIZE = 150; // Base cell size in Figma (pixels)
  const GAP = 8; // Gap between cells

  return {
    version: 1,
    grid: {
      rows,
      columns,
      cellSize: CELL_SIZE,
      gap: GAP,
    },
    items: items.map((item) => ({
      id: item.id,
      x: (item.col - 1) * (CELL_SIZE + GAP),
      y: (item.row - 1) * (CELL_SIZE + GAP),
      width: item.width * CELL_SIZE + (item.width - 1) * GAP,
      height: item.height * CELL_SIZE + (item.height - 1) * GAP,
      color: item.color.replace("bg-", ""), // Convert Tailwind color to Figma color
    })),
  };
};
