import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  Sequelize,
  HasMany,
} from 'sequelize-typescript';
import { Family } from '../../families/models/family.model';
import { Fridge } from '../../fridges/models/fridge.model';
import { Recipe } from '../../recipes/models/recipe.model';
import { ShoppingList } from '../../shopping-lists/models/shopping-list.model';
import { Message } from '../../messages/models/message.model';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column
  username: string;

  @Column
  password: string;

  @ForeignKey(() => Family)
  @Column({ allowNull: true })
  familyId: number;

  @BelongsTo(() => Family)
  family: Family;

  @HasMany(() => Fridge)
  fridges: Fridge[];

  @HasMany(() => Recipe)
  recipes: Recipe[];

  @HasMany(() => ShoppingList)
  shoppingLists: ShoppingList[];

  @HasMany(() => Message)
  messages: Message[];
}
