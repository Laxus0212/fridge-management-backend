import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from '../../users/models/user.model';
import { Family } from '../../families/models/family.model';

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

  @Column({
    type: DataTypes.ENUM('breakfast', 'lunch', 'dinner'),
  })
  mealType: string;

  @ForeignKey(() => User)
  @Column
  savedBy: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Family)
  @Column({ allowNull: true })
  familyId: number;

  @BelongsTo(() => Family)
  family: Family;
}
