import { CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

class Product {
  id: number;
  name: string;
  image: string;
  note: string;
  quantity: number;
  price: number;
  discount: number;
  tax: number;
}

@Entity({ name: 'pos_order', synchronize: false })
export class PosOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'cart_id' })
  cartId: number;

  @Column({ name: 'order_status' })
  orderStatus: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'sdt' })
  phoneNumber: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'products', array: false, default: () => "'[]'", nullable: false, type: 'jsonb' })
  products: Array<Product>;

  @Column({ name: 'payment_method' })
  paymentMethod: string;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @Column({ name: 'discount_total' })
  discountTotal: number;

  @Column({ name: 'sub_total' })
  subTotal: number;

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
