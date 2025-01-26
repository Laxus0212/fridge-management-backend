import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './models/product.model';
import { Shelf } from '../shelves/models/shelf.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Product, Shelf])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
