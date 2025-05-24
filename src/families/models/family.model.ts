import { Table, Model, Column, HasMany, DataType } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Fridge } from '../../fridges/models/fridge.model';
import { Recipe } from '../../recipes/models/recipe.model';
import { ShoppingList } from '../../shopping-lists/models/shopping-list.model';
import { Message } from '../../messages/models/message.model';

@Table
export class Family extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  familyId: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  familyName: string;

  @HasMany(() => User)
  members: User[];

  @HasMany(() => Fridge)
  fridges: Fridge[];

  @HasMany(() => Recipe)
  recipes: Recipe[];

  @HasMany(() => ShoppingList)
  shoppingLists: ShoppingList[];

  @HasMany(() => Message)
  messages: Message[];
}
