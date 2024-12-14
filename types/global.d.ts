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
}
