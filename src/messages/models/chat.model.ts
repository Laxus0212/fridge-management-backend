import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import { Message } from './message.model';

@Table
export class Chat extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  chatId: number;

  @Column
  familyId: number;

  @HasMany(() => Message)
  messages: Message[];
}
