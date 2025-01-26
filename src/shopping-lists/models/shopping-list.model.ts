import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import { ShoppingListItem } from './shopping-list-item.model';

@Table
export class ShoppingList extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  listId: number;

  @Column
  name: string;

  @Column
  ownerId: number;

  @Column({ allowNull: true })
  familyId: number;

  @HasMany(() => ShoppingListItem)
  items: ShoppingListItem[];
}
