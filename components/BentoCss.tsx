import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { generateTailwindCSS, generatePlainCSS } from "@/lib/bentoUtils";
import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";

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

function BentoCss({ items, rows, columns }: BentoCssProps) {
  const [copied, setCopied] = React.useState<string | null>(null);

  // Convert grid items to format expected by generators
  const formattedItems = items.map((item) => ({
    id: item.id,
    col: (item.startCell % columns) + 1,
    row: Math.floor(item.startCell / columns) + 1,
    width: item.width,
    height: item.height,
    color: item.color,
  }));

  const tailwindCSS = generateTailwindCSS(formattedItems, rows, columns);
  const plainCSS = generatePlainCSS(formattedItems, rows, columns);

  // Generate plain HTML structure
  const plainHTML = `<div class="bento-grid">
${formattedItems
  .map((item) => `  <div class="grid-item-${item.id}"></div>`)
  .join("\n")}
</div>`;

  const handleCopy = async (content: string, type: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Card className="w-full overflow-hidden">
      <Tabs defaultValue="tailwind" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tailwind">Tailwind CSS</TabsTrigger>
          <TabsTrigger value="plain">Plain CSS</TabsTrigger>
        </TabsList>
        <CardContent className="p-4">
          <TabsContent value="tailwind">
            <div className="space-y-4">
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(tailwindCSS, "tailwind")}
                >
                  {copied === "tailwind" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <code>{tailwindCSS}</code>
                </pre>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="plain">
            <div className="space-y-4">
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(plainHTML, "html")}
                >
                  {copied === "html" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <code>{plainHTML}</code>
                </pre>
              </div>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(plainCSS, "css")}
                >
                  {copied === "css" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <code>{plainCSS}</code>
                </pre>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}

export default BentoCss;
