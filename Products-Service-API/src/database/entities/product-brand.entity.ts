import { CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Dot not turn on synchronize
@Entity({ name: 'product_brand', synchronize: false })
export class ProductBrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'image' })
  image: string;

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
