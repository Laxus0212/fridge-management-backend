import { MessageResponseDto } from './message-response.dto';

export class ChatResponseDto {
  chatId: number;
  familyId: number;
  messages: MessageResponseDto[];
}
