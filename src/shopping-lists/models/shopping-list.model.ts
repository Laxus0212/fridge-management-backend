import {
  Table,
  Model,
  Column,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ShoppingListItem } from './shopping-list-item.model';
import { User } from '../../users/models/user.model';
import { Family } from '../../families/models/family.model';

@Table
export class ShoppingList extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  listId: number;

  @Column
  name: string;

  @ForeignKey(() => User)
  @Column
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;

  @ForeignKey(() => Family)
  @Column({ allowNull: true })
  familyId: number;

  @BelongsTo(() => Family)
  family: Family;

  @HasMany(() => ShoppingListItem)
  items: ShoppingListItem[];
}
