import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Shelf } from '../../shelves/models/shelf.model';
import { DataTypes } from 'sequelize';
import { Unit } from '../dto/unit';

@Table
export class Product extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  productId: number;

  @Column
  productName: string;

  @Column
  quantity: number;

  @Column({ type: DataTypes.ENUM(...Object.values(Unit)) })
  unit: string;

  @Column({ type: DataTypes.DATEONLY })
  expirationDate: string;

  @Column({ type: DataTypes.DATEONLY, allowNull: true })
  openedDate: string;

  @ForeignKey(() => Shelf)
  @Column
  shelfId: number;

  @BelongsTo(() => Shelf)
  shelf: Shelf;
}
