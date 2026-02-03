import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async buildAuthResponse(user: User): Promise<AuthResponseDto> {
    const name = user.name;
    // Converting user id to string because JSON can't serialize bigint type
    const id = user.id.toString();

    const jwtToken = await this.jwtService.signAsync({
      sub: id,
      name,
    });

    return {
      user: {
        id: id,
        email: user.email,
        name: name,
      },
      accessToken: jwtToken,
    };
  }

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const passwordHash = await argon2.hash(dto.password);

    const user = await this.userService.createUser(
      dto.username,
      dto.email,
      passwordHash,
    );

    return await this.buildAuthResponse(user);
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await argon2.verify(user.password, dto.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    return await this.buildAuthResponse(user);
  }
}
