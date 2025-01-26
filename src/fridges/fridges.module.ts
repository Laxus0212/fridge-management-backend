import { Module } from '@nestjs/common';
import { FridgesService } from './fridges.service';
import { FridgesController } from './fridges.controller';
import { Fridge } from './models/fridge.model';
import { Shelf } from '../shelves/models/shelf.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Fridge, Shelf])],
  controllers: [FridgesController],
  providers: [FridgesService],
})
export class FridgesModule {}
