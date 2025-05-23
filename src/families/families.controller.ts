import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FamiliesService } from './families.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { MessagesService } from '../messages/messages.service';

@Controller('families')
export class FamiliesController {
  constructor(
    private readonly familiesService: FamiliesService,
    private readonly messagesService: MessagesService,
  ) {}

  @Post()
  async create(@Body() createFamilyDto: CreateFamilyDto) {
    const family = await this.familiesService.create(createFamilyDto).then(
      async (family) => {
        await this.messagesService.createChat({ familyId: family.familyId });
        return family;
      },
      (error) => {
        throw new BadRequestException(error.message);
      },
    );
    return family;
  }

  @Get()
  findAll() {
    return this.familiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const family = await this.familiesService.findOne(+id);
    if (!family) {
      throw new NotFoundException(`Family with ID ${id} not found`);
    }
    return family;
  }

  @Get(':familyId/chat')
  async findChatByFamilyId(@Param('familyId') familyId: string) {
    const family = await this.familiesService.findOne(+familyId);
    if (!family) {
      throw new NotFoundException(`Family with ID ${familyId} not found`);
    }
    return this.messagesService.findChatByFamilyId(+familyId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
    return this.familiesService.update(+id, updateFamilyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familiesService.remove(+id);
  }

  @Post(':familyId/invite')
  async inviteUser(
    @Param('familyId') familyId: string,
    @Body() inviteUserDto: InviteUserDto,
  ) {
    try {
      await this.familiesService.inviteUser(+familyId, inviteUserDto);
      return { message: 'Invitation sent successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('invites/:userId')
  async getPendingInvites(@Param('userId') userId: string) {
    const invites = await this.familiesService.getPendingInvites(+userId);
    if (!invites || invites.length === 0) {
      throw new NotFoundException('No pending invites found');
    }
    return invites;
  }

  @Post('invites/:inviteId/accept')
  async acceptInvite(@Param('inviteId') inviteId: string) {
    try {
      await this.familiesService.acceptInvite(+inviteId);
      return { message: 'Invitation accepted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('invites/:inviteId/decline')
  async declineInvite(@Param('inviteId') inviteId: string) {
    try {
      await this.familiesService.declineInvite(+inviteId);
      return { message: 'Invitation declined successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id/users')
  getFamilyMembers(@Param('id') id: string) {
    return this.familiesService.getFamilyMembers(+id);
  }

  @Post(':familyId/leave')
  async leaveFamily(
    @Param('familyId') familyId: string,
    @Body('userId') userId: number,
  ) {
    try {
      await this.familiesService.leaveFamily(userId, +familyId);
      return { message: 'Successfully left the family' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
