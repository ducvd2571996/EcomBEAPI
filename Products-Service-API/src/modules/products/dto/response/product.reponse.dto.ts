export class ProductResDto {
  id: number;
  name: string;
  image: string;
  description: string;
  tax: number;
  price: number;
  discount: number;
  brand: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductListResDto {
  items: ProductResDto[];
}
