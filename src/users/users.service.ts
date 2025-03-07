import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class UsersService {
  private googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async verifyGoogleToken(token: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      return ticket;
    } catch (error) {
      throw new Error('Invalid Google token: ' + error.message);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({
      ...createUserDto,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(condition: Record<string, any>): Promise<User> {
    if (
      !condition ||
      typeof condition !== 'object' ||
      Array.isArray(condition)
    ) {
      throw new Error('Invalid condition format. Must be an object.');
    }

    return await this.userModel
      .findOne({ where: condition })
      .then((user) => user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne({ userId: id });
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await user.update(updateUserDto);
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne({ userId: id });
    await user.destroy();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async validateOAuthUser(email: string, username: string) {
    let user = await this.findOne({ email });

    if (!user) {
      user = await this.create({ email, username, password: '' });
    }

    return user;
  }
}
