import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface BentoInputsProps {
  rows: number;
  columns: number;
  setRows: (rows: number) => void;
  setColumns: (columns: number) => void;
}

const BentoInputs = ({
  rows,
  columns,
  setRows,
  setColumns,
}: BentoInputsProps) => {
  return (
    <div className="flex gap-5 w-64">
      <div className="flex flex-col gap-2">
        <Label>Rows</Label>
        <Input
          type="number"
          placeholder="Rows"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Columns</Label>
        <Input
          type="number"
          placeholder="Columns"
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default BentoInputs;
