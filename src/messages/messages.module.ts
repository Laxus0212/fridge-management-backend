import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message } from './models/message.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessageGateway } from './websocket/message.gateway';
import { Chat } from './models/chat.model';

@Module({
  imports: [SequelizeModule.forFeature([Message, Chat])],
  controllers: [MessagesController],
  providers: [MessagesService, MessageGateway],
  exports: [MessagesService, MessageGateway],
})
export class MessagesModule {}
