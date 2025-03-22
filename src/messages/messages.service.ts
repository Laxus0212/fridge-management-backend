import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Message} from './models/message.model';
import {CreateMessageDto} from './dto/create-message.dto';
import {UpdateMessageDto} from './dto/update-message.dto';
import {MessageResponseDto} from './dto/message-response.dto';
import {CreateChatDto} from './dto/create-chat.dto';
import {ChatResponseDto} from './dto/chat-response.dto';
import {Chat} from './models/chat.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message)
    private readonly messageModel: typeof Message,
    @InjectModel(Chat)
    private readonly chatModel: typeof Chat,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
  ): Promise<MessageResponseDto> {
    // Check if the chatId exists in the Chats table
    const chatExists = await this.chatModel.findOne({
      where: { chatId: createMessageDto.chatId },
    });

    if (!chatExists) {
      throw new Error('Invalid chatId: The specified chat does not exist.');
    }

    // Create the message if the chatId is valid
    const message = await this.messageModel.create(
      createMessageDto as Partial<CreateMessageDto>,
    );

    return message as unknown as MessageResponseDto;
  }

  async createChat(createChatDto: CreateChatDto): Promise<ChatResponseDto> {
    const chat = await this.chatModel.create(
      createChatDto as Partial<CreateChatDto>,
    );
    return chat as unknown as ChatResponseDto;
  }

  async findChatByFamilyId(familyId: number): Promise<ChatResponseDto> {
    const chat = await this.chatModel.findOne({
      where: { familyId },
    });
    if (!chat) {
      throw new NotFoundException(`Chat with family ID ${familyId} not found`);
    }
    //get all messages for this chat
    chat.messages = await this.messageModel.findAll({
      where: { chatId: chat.chatId },
    });
    return chat as unknown as ChatResponseDto;
  }

  async findAllByChatId(familyId: number): Promise<MessageResponseDto[]> {
    return (await this.messageModel.findAll({
      where: { familyId },
      attributes: [
        'messageId',
        'chatId',
        'senderId',
        'username',
        'message',
        'familyId',
        'sentAt',
      ],
    })) as unknown as MessageResponseDto[];
  }

  async findOne(messageId: string): Promise<MessageResponseDto> {
    const message = await this.messageModel.findByPk(messageId);
    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }
    return message as unknown as MessageResponseDto;
  }

  async update(
    messageId: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<MessageResponseDto> {
    const message = await this.messageModel.findByPk(messageId);
    await message.update(updateMessageDto);
    return message as unknown as MessageResponseDto;
  }

  async delete(messageId: string): Promise<void> {
    const message = await this.messageModel.findByPk(messageId);
    await message.destroy();
  }
}
