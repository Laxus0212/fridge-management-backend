import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Recipe } from './recipe.model';
import { DataTypes } from 'sequelize';

@Table
export class Ingredient extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  ingredientId: number;

  @Column
  ingredient_name: string;

  @Column({ type: DataTypes.DECIMAL })
  quantity: number;

  @Column({ type: DataTypes.ENUM('g', 'kg', 'ml', 'l', 'pcs', 'dkg', 'dl') })
  unit: string;

  @ForeignKey(() => Recipe)
  @Column
  recipeId: number;

  @BelongsTo(() => Recipe)
  recipe: Recipe;
}
