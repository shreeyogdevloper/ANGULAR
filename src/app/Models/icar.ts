export interface Icar {

    id: number;
  brand: string;
  class: string;
  modelName: string;
  modelCode: string;
  description: string;
  features: string;
  price: number;
  dateOfManufacturing: Date;
  active: boolean;
  sortOrder: number;
  images: string[];
}
