import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { User } from './models/user.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    const user = this.usersService.create(createUserDto);

    if (!user) {
      throw new BadRequestException('User could not be created');
    }

    const { password, ...result } = (await user).toJSON();

    return result;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'varadinas.synology.me',
    });

    return {
      message: 'User logged out successfully',
    };
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    const user = await this.usersService.findOne({ email: loginUserDto.email });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      Logger.log('Invalid User Password', user.family, user.password, 'Login');
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ userId: user.userId });

    response.cookie('jwt', jwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'varadinas.synology.me',
    });

    return {
      message: 'User logged in successfully',
    };
  }

  @Post('google/login')
  async googleLogin(
    @Body('credential') credential: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    try {
      // Verify and decode Google ID Token
      const ticket = await this.usersService.verifyGoogleToken(credential);
      const payload = ticket.getPayload();

      // Extract user information
      const email = payload.email;
      const name = payload.name;

      // Validate or create user in database
      const user = await this.usersService.validateOAuthUser(email, name);

      // Generate a JWT for your application
      const jwt = await this.jwtService.signAsync({ userId: user.userId });

      res.cookie('jwt', jwt, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: 'varadinas.synology.me',
      });

      return {
        message: 'User logged in successfully',
      };
    } catch (error) {
      console.error('Google Login Error:', error);
      return { message: 'Invalid Google login' };
    }
  }

  @Get('user')
  async getUser(@Req() request: Request): Promise<User> {
    const jwt = request.cookies['jwt'];

    if (!jwt) {
      throw new BadRequestException('Invalid credentials');
    }

    const data = await this.jwtService.verifyAsync(jwt);

    if (!data) {
      throw new BadRequestException('Invalid credentials');
    }

    const user: User = await this.usersService.findOne({ userId: data.userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user.toJSON();

    return result;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('google/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const user = req.user;

    if (!user || !user.email) {
      throw new BadRequestException('Invalid Google response');
    }

    const validatedUser = await this.usersService.validateOAuthUser(
      user.email,
      user.username,
    );
    const jwt = await this.jwtService.signAsync({
      userId: validatedUser.userId,
    });

    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'varadinas.synology.me',
    });

    return { message: 'User logged in successfully' };
  }
}
