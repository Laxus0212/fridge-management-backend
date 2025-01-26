import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Chat } from './chat.model';
import { DataTypes } from 'sequelize';

@Table
export class Message extends Model {
  @Column({ primaryKey: true, defaultValue: DataTypes.UUIDV4 })
  messageId: string;

  @ForeignKey(() => Chat)
  @Column
  chatId: number;

  @Column
  senderId: number;

  @Column
  message: string;

  @Column({ defaultValue: DataTypes.NOW })
  sentAt: Date;

  @BelongsTo(() => Chat)
  chat: Chat;
}