import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Family } from './models/family.model';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { User } from '../users/models/user.model';
import { InviteUserDto } from './dto/invite-user.dto';
import { Invitation } from './models/invitation.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectModel(Family)
    private readonly familyModel: typeof Family,
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Invitation)
    private readonly invitationModel: typeof Invitation,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createFamilyDto: CreateFamilyDto): Promise<Family> {
    const family = await this.familyModel.create({
      familyName: createFamilyDto.familyName,
    });
    return family;
  }

  async findAll(): Promise<Family[]> {
    return this.familyModel.findAll();
  }

  async findOne(id: number): Promise<Family> {
    const family = await this.familyModel.findByPk(id);
    if (!family) {
      throw new NotFoundException(`Family with ID ${id} not found`);
    }
    return family;
  }

  async update(id: number, updateFamilyDto: UpdateFamilyDto): Promise<Family> {
    const family = await this.findOne(id);
    await family.update(updateFamilyDto);
    return family;
  }

  async remove(id: number): Promise<void> {
    const family = await this.findOne(id);
    await family.destroy();
  }

  async inviteUser(
    familyId: number,
    inviteUserDto: InviteUserDto,
  ): Promise<void> {
    const transaction = await this.sequelize.transaction();
    try {
      const family = await this.familyModel.findByPk(familyId, { transaction });
      if (!family) {
        throw new NotFoundException('Family not found');
      }

      const user = await this.userModel.findOne({
        where: { email: inviteUserDto.email },
        transaction,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isMember = await this.familyModel.findOne({
        include: [{ model: User, where: { userId: user.userId } }],
        transaction,
      });
      if (isMember) {
        throw new BadRequestException('User is already a member of the family');
      }

      await this.invitationModel.create(
        {
          familyId,
          invitedUserId: user.userId,
          status: 'pending',
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getPendingInvites(userId: number): Promise<Invitation[]> {
    return this.invitationModel.findAll({
      where: { invitedUserId: userId, status: 'pending' },
      include: [{ model: Family, include: [User] }],
    });
  }

  async acceptInvite(invitationId: number): Promise<void> {
    const invitation = await this.invitationModel.findByPk(invitationId);
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    await invitation.update({ status: 'accepted' });

    await this.userModel.update(
      { familyId: invitation.familyId },
      { where: { userId: invitation.invitedUserId } },
    );
  }

  async declineInvite(invitationId: number): Promise<void> {
    const invitation = await this.invitationModel.findByPk(invitationId);
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    await invitation.update({ status: 'declined' });
  }

  async getFamilyMembers(familyId: number): Promise<User[]> {
    const family = await this.familyModel.findByPk(familyId, {
      include: [{ model: User, as: 'members' }],
    });
    if (!family) {
      throw new NotFoundException(`Family with ID ${familyId} not found`);
    }
    return family.members;
  }

  async leaveFamily(userId: number, familyId: number): Promise<void> {
    const transaction = await this.sequelize.transaction();
    try {
      const family = await this.familyModel.findByPk(familyId, {
        include: [User],
        transaction,
      });

      if (!family) {
        throw new NotFoundException('Family not found');
      }

      // Check how many users are in the family
      const members = family.members;
      if (members.length === 1 && members[0].userId === userId) {
        // delete the family and all invitations if the user is the only member
        await this.invitationModel.destroy({
          where: { familyId },
          transaction,
        });
        await family.destroy({ transaction });
      } else {
        // set the user's familyId to null if they are not the only member
        await this.userModel.update(
          { familyId: null },
          { where: { userId }, transaction },
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
