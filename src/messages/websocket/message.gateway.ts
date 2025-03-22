import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';

@WebSocketGateway({
  origin: [
    'http://localhost:8100',
    'https://accounts.google.com',
    'http://localhost',
    'https://localhost',
    'capacitor://localhost',
    'https://varadinas.synology.me',
    'http://varadinas.synology.me',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
  exposedHeaders: ['Authorization'],
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(public readonly messagesService: MessagesService) {}

  afterInit() {
    console.log('✅ WebSocket szerver elindult a 3001-es porton');
    console.log(this.server);
  }

  handleConnection(client: Socket): void {
    this.server.emit('room', client.id + ' joined!');
  }

  handleDisconnect(client: Socket): void {
    this.server.emit('room', client.id + ' left!');
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: CreateMessageDto): Promise<void> {
    const message = await this.messagesService.create(data);
    this.server.emit('newMessage', {
      id: message.messageId,
      chatId: message.chatId,
      senderId: message.senderId,
      username: message.username,
      message: message.message,
      familyId: message.familyId,
      sentAt: message.sentAt,
    });
  }
}
