import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import { Ingredient } from './ingredient.model';
import { DataTypes } from 'sequelize';

@Table
export class Recipe extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  recipeId: number;

  @Column
  recipeName: string;

  @Column({ type: DataTypes.ENUM('reggeli', 'ebéd', 'vacsora') })
  mealType: string;

  @Column
  saved_by: number;

  @Column({ defaultValue: false })
  sharedWithFamily: boolean;

  @HasMany(() => Ingredient)
  ingredients: Ingredient[];
}
