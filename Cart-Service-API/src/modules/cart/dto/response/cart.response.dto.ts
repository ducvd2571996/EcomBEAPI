export class ProductRes {
  name: string;
  image: string;
  tax: number;
  quantity: number;
  price: number;
  note: string;
}

export class GetCartResDTO {
  products: ProductRes[];
  tax: number;
  totalPrice: number;
  note: string;
}
