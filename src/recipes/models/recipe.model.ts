import { Table, Model, Column } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class Recipe extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column({ type: DataTypes.TEXT })
  ingredients: string; // JSON.stringify([...])

  @Column({ type: DataTypes.TEXT })
  instructions: string;

  @Column({ type: DataTypes.TEXT })
  description: string;

  @Column
  savedBy: number;

  @Column({ allowNull: true })
  familyId: number;

  @Column({
    type: DataTypes.ENUM('breakfast', 'lunch', 'dinner'),
    allowNull: true,
  })
  mealType: string;
}
