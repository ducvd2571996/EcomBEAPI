import { CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Dot not turn on synchronize
@Entity({ name: 'pos_customer', synchronize: false })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_id', type: 'uuid', unique: true })
  customerId: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'address' })
  address: string;

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
