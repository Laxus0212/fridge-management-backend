import {Table, Model, Column, ForeignKey, BelongsTo, Sequelize} from 'sequelize-typescript';
import { Family } from '../../families/models/family.model';

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

  @Column({ defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') })
  createdAt: Date;

  @Column({ defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') })
  updatedAt: Date;
}
