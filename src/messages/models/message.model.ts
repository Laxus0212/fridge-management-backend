import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Chat } from './chat.model';
import { DataTypes } from 'sequelize';
import { User } from '../../users/models/user.model';
import { Family } from '../../families/models/family.model';

@Table
export class Message extends Model {
  @Column({ primaryKey: true, defaultValue: DataTypes.UUIDV4 })
  messageId: string;

  @ForeignKey(() => Chat)
  @Column
  chatId: number;

  @ForeignKey(() => User)
  @Column
  senderId: number;

  @BelongsTo(() => User)
  sender: User;

  @Column
  username: string;

  @Column
  message: string;

  @ForeignKey(() => Family)
  @Column
  familyId: number;

  @BelongsTo(() => Family)
  family: Family;

  @Column({ defaultValue: DataTypes.NOW })
  sentAt: Date;

  @BelongsTo(() => Chat)
  chat: Chat;
}
