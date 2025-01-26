// invitation.model.ts
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Family } from './family.model';
import { User } from '../../users/models/user.model';

@Table
export class Invitation extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  invitationId: number;

  @ForeignKey(() => Family)
  @Column
  familyId: number;

  @BelongsTo(() => Family)
  family: Family;

  @ForeignKey(() => User)
  @Column
  invitedUserId: number;

  @BelongsTo(() => User)
  invitedUser: User;

  @Column({ defaultValue: 'pending' })
  status: 'pending' | 'accepted' | 'declined';
}
