import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import {
  generateTailwindCSS,
  generatePlainCSS,
  generateFigmaConfig,
} from "@/lib/bentoUtils";
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
  const figmaConfig = generateFigmaConfig(formattedItems, rows, columns);

  // Generate plain HTML structure
  const plainHTML = `<div class=&quot;bento-grid&quot;>
${formattedItems
  .map((item) => `  <div class=&quot;grid-item-${item.id}&quot;></div>`)
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tailwind">Tailwind CSS</TabsTrigger>
          <TabsTrigger value="plain">Plain CSS</TabsTrigger>
          <TabsTrigger value="figma">Figma</TabsTrigger>
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
          <TabsContent value="figma">
            <div className="space-y-4">
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() =>
                    handleCopy(JSON.stringify(figmaConfig, null, 2), "figma")
                  }
                >
                  {copied === "figma" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <code>{JSON.stringify(figmaConfig, null, 2)}</code>
                </pre>
              </div>
              <div className="text-sm text-gray-500">
                <p>To use this layout in Figma:</p>
                <ol className="list-decimal ml-4 mt-2 space-y-2">
                  <li>
                    Install the &quot;Bengrid&quot; plugin in Figma (coming
                    soon)
                  </li>
                  <li>Copy the configuration above</li>
                  <li>In Figma, run the Bengrid plugin</li>
                  <li>Paste the configuration</li>
                  <li>Click &quot;Generate Layout&quot;</li>
                </ol>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}

export default BentoCss;
