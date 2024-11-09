import { CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Dot not turn on synchronize
@Entity({ name: 'pos_user', synchronize: false })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'uuid', unique: true })
  userId: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'user_role' })
  role: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'email' })
  email: string;

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
