import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageResponseDto } from './dto/message-response.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageResponseDto> {
    return this.messagesService.create(createMessageDto);
  }

  @Get('chats/:familyId/messages')
  async findAllByChatId(
    @Param('familyId') familyId: number,
  ): Promise<MessageResponseDto[]> {
    return this.messagesService.findAllByChatId(familyId);
  }

  @Get(':messageId')
  async findOne(
    @Param('messageId') messageId: string,
  ): Promise<MessageResponseDto> {
    const message = await this.messagesService.findOne(messageId);
    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }
    return message;
  }

  @Put(':messageId')
  async update(
    @Param('messageId') messageId: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<MessageResponseDto> {
    return this.messagesService.update(messageId, updateMessageDto);
  }

  @Delete(':messageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('messageId') messageId: string): Promise<void> {
    return this.messagesService.delete(messageId);
  }
}
