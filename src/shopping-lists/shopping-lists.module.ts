import { Module } from '@nestjs/common';
import { ShoppingListsService } from './shopping-lists.service';
import { ShoppingListsController } from './shopping-lists.controller';
import { ShoppingList } from './models/shopping-list.model';
import { ShoppingListItem } from './models/shopping-list-item.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([ShoppingList, ShoppingListItem, User])],
  controllers: [ShoppingListsController],
  providers: [ShoppingListsService],
})
export class ShoppingListsModule {}
