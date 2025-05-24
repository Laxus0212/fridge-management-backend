import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ShoppingList } from './shopping-list.model';
import { DataTypes } from 'sequelize';
import { Unit } from '../../products/dto/unit';

@Table
export class ShoppingListItem extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  itemId: number;

  @Column
  productName: string;

  @Column({ type: DataTypes.DECIMAL(10, 2) })
  quantity: number;

  @Column({ type: DataTypes.ENUM(...Object.values(Unit)) })
  unit: string;

  @ForeignKey(() => ShoppingList)
  @Column
  shoppingListId: number;

  @BelongsTo(() => ShoppingList)
  shoppingList: ShoppingList;
}
