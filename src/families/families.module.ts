import { Module } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';
import { Family } from './models/family.model';
import { User } from '../users/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invitation } from './models/invitation.model';
import { MessagesService } from '../messages/messages.service';
import { Chat } from '../messages/models/chat.model';
import { Message } from '../messages/models/message.model';
import { Recipe } from '../recipes/models/recipe.model';
import { Fridge } from '../fridges/models/fridge.model';
import { ShoppingList } from '../shopping-lists/models/shopping-list.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Family,
      User,
      Invitation,
      Chat,
      Message,
      Recipe,
      Fridge,
      ShoppingList,
    ]),
  ],
  controllers: [FamiliesController],
  providers: [FamiliesService, MessagesService],
})
export class FamiliesModule {}
