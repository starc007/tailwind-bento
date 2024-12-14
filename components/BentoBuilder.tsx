import React from "react";
import BentoGrid from "./BentoGrid";
import BentoCss from "./BentoCss";

const BentoBuilder = () => {
  const [gridState, setGridState] = React.useState<{
    items: GridItem[];
    rows: number;
    columns: number;
  }>({
    items: [],
    rows: 3,
    columns: 3,
  });

  const handleGridUpdate = (
    items: GridItem[],
    rows: number,
    columns: number
  ) => {
    setGridState({ items, rows, columns });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 mt-5">
      <div className="md:w-2/3 w-full">
        <BentoGrid onUpdate={handleGridUpdate} />
      </div>
      <div className="md:w-1/3 w-full">
        <BentoCss
          items={gridState.items}
          rows={gridState.rows}
          columns={gridState.columns}
        />
      </div>
    </div>
  );
};

export default BentoBuilder;
