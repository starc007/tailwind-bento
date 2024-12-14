export declare global {
  export interface BentoItem {
    id: string;
    row: number;
    col: number;
    width: number;
    height: number;
    color: string;
  }
  interface GridItem {
    id: string;
    startCell: number;
    width: number;
    height: number;
    color: string;
    isActive: boolean;
  }

  interface FigmaGridConfig {
    version: number;
    grid: {
      rows: number;
      columns: number;
      cellSize: number;
      gap: number;
    };
    items: {
      id: string;
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
    }[];
  }
}
