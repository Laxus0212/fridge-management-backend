import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import { Shelf } from '../../shelves/models/shelf.model';

@Table
export class Fridge extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  fridgeId: number;

  @Column
  fridgeName: string;

  @Column
  ownerId: number;

  @Column({ allowNull: true })
  familyId: number;

  @HasMany(() => Shelf)
  shelves: Shelf[];
}
