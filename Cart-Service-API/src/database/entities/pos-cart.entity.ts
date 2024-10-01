import { CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

class Product {
  id: number;
  name: string;
  image: string;
  note: string;
  quantity: number;
  price: number;
  tax: number;
}

class Coupon {
  code: string;
  value: number;
}

@Entity({ name: 'pos_cart', synchronize: false })
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'note' })
  note: string;

  @Column({ name: 'coupon', array: false, default: () => "'{}'", nullable: false, type: 'jsonb' })
  coupon: Coupon;

  @Column({ name: 'products', array: false, default: () => "'[]'", nullable: false, type: 'jsonb' })
  products: Array<Product>;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @Column({ name: 'discount_total' })
  discountTotal: number;

  @Column({ name: 'sub_total' })
  subTotal: number;

  @Column({ name: 'tax' })
  tax: number;

  @Column({
    name: 'created_at',
  })
  @CreatedAt
  public createdAt: Date;

  @Column({
    name: 'updated_at',
  })
  @UpdatedAt
  public updatedAt: Date;
}
