import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './models/message.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageResponseDto } from './dto/message-response.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message)
    private readonly messageModel: typeof Message,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
  ): Promise<MessageResponseDto> {
    // Check if the chatId exists in the Chats table
    const chatExists = await this.messageModel.findOne({
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

  async findAllByChatId(chatId: number): Promise<MessageResponseDto[]> {
    return (await this.messageModel.findAll({
      where: { chatId },
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
