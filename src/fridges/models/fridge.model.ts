import {
  Table,
  Model,
  Column,
  HasMany,
  ForeignKey, BelongsTo,
} from 'sequelize-typescript';
import { Shelf } from '../../shelves/models/shelf.model';
import { User } from '../../users/models/user.model';
import { Family } from '../../families/models/family.model';

@Table
export class Fridge extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  fridgeId: number;

  @Column
  fridgeName: string;

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

  @HasMany(() => Shelf)
  shelves: Shelf[];
}
