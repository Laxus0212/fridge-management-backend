import { Module } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';
import { Family } from './models/family.model';
import { User } from '../users/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invitation } from './models/invitation.model';

@Module({
  imports: [SequelizeModule.forFeature([Family, User, Invitation])],
  controllers: [FamiliesController],
  providers: [FamiliesService],
})
export class FamiliesModule {}
