/** * Interface defining the structure of a Procedure */
export interface Procedure {
  id: number;
  label: string;       // Name shown on the button
  title: string;       // Title shown in Info Display
  description: string;
  icon: string;
  color: string;
  requirements: string[];
  steps: string[];
  cost: number;
  category: 'acta' | 'tramite';
}