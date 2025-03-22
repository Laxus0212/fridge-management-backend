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

@Module({
  imports: [
    SequelizeModule.forFeature([Family, User, Invitation, Chat, Message]),
  ],
  controllers: [FamiliesController],
  providers: [FamiliesService, MessagesService],
})
export class FamiliesModule {}
