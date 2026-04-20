export interface Procedure {
  id: number;
  title: string;
  description: string;
  requirements: string[];
  steps: string[];
  cost: number;
}