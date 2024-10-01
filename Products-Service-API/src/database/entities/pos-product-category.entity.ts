import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PosCategoryEntity } from './pos-category.entity';
import { PosProductEntity } from './pos-product.entity';

// Dot not turn on synchronize
@Entity({ name: 'product_category', synchronize: false })
export class PosProductCategoryEntity {
  @PrimaryColumn()
  category_id: number;

  @PrimaryColumn()
  product_id: number;

  @ManyToOne(() => PosCategoryEntity)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: PosCategoryEntity;

  @ManyToOne(() => PosProductEntity)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: PosProductEntity;
}
