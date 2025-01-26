import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShelvesService } from './shelves.service';
import { ShelvesController } from './shelves.controller';
import { Shelf } from './models/shelf.model';
import { Fridge } from '../fridges/models/fridge.model';
import { Product } from '../products/models/product.model';

@Module({
  imports: [SequelizeModule.forFeature([Shelf, Fridge, Product])],
  controllers: [ShelvesController],
  providers: [ShelvesService],
})
export class ShelvesModule {}
