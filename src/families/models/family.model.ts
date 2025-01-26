import { Table, Model, Column, HasMany, DataType } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

@Table
export class Family extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  familyId: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  familyName: string;

  @HasMany(() => User)
  members: User[];
}
