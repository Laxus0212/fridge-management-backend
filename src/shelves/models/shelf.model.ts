import { Table, Model, Column, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Fridge } from '../../fridges/models/fridge.model';
import { Product } from '../../products/models/product.model';

@Table
export class Shelf extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  shelfId: number;

  @Column
  shelfName: string;

  @ForeignKey(() => Fridge)
  @Column
  fridgeId: number;

  @BelongsTo(() => Fridge)
  fridge: Fridge;

  @HasMany(() => Product)
  products: Product[];
}
