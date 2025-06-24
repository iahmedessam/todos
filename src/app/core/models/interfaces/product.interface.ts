export interface ProductType {
  name: string;
  path: string;
  desc?: string | undefined;
  id: number;
}

export interface Product {
  brand: string;
  image: string;
  types: ProductType[];
}
