import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { generateTailwindCSS, generatePlainCSS } from "@/lib/bentoUtils";

interface BentoCssProps {
  items: {
    id: string;
    startCell: number;
    width: number;
    height: number;
    color: string;
    isActive: boolean;
  }[];
  rows: number;
  columns: number;
}

const BentoCss = ({ items, rows, columns }: BentoCssProps) => {
  // Convert grid items to format expected by generators
  const formattedItems = items.map((item) => ({
    id: item.id,
    col: (item.startCell % columns) + 1, // Convert to 1-based index
    row: Math.floor(item.startCell / columns) + 1, // Convert to 1-based index
    width: item.width,
    height: item.height,
    color: item.color,
  }));

  const tailwindCSS = generateTailwindCSS(formattedItems, rows, columns);
  const plainCSS = generatePlainCSS(formattedItems, rows, columns);

  return (
    <Card className="w-full overflow-hidden">
      <Tabs defaultValue="tailwind" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tailwind">Tailwind CSS</TabsTrigger>
          <TabsTrigger value="plain">Plain CSS</TabsTrigger>
        </TabsList>
        <CardContent className="p-4">
          <TabsContent value="tailwind">
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <code>{tailwindCSS}</code>
            </pre>
          </TabsContent>
          <TabsContent value="plain">
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <code>{plainCSS}</code>
            </pre>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default BentoCss;
