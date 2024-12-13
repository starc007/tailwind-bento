export const generateTailwindCSS = (
  items: BentoItem[],
  rows: number,
  columns: number
): string => {
  return `<!-- Grid Container -->
<div class="grid grid-cols-${columns} grid-rows-${rows} gap-2">
${items
  .map(
    (item) =>
      `  <div class="col-start-${item.col} col-span-${item.width} row-start-${item.row} row-span-${item.height} ${item.color} rounded-lg shadow-lg p-4">
    <!-- Content -->
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
    "bg-blue-100": "#dbeafe",
    "bg-green-100": "#dcfce7",
    "bg-purple-100": "#f3e8ff",
    "bg-yellow-100": "#fef9c3",
    "bg-pink-100": "#fce7f3",
    "bg-indigo-100": "#e0e7ff",
    "bg-red-100": "#fee2e2",
    "bg-orange-100": "#ffedd5",
  };

  return `.bento-grid {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: 8px;
  padding: 8px;
}

${items
  .map(
    (item) =>
      `.grid-item-${item.id} {
  grid-column: ${item.col} / span ${item.width};
  grid-row: ${item.row} / span ${item.height};
  background: ${colorMap[item.color as keyof typeof colorMap]};
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  padding: 1rem;
}`
  )
  .join("\n\n")}`;
};
