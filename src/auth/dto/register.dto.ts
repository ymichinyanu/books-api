import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'example@example.com',
  })
  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  @MaxLength(320, {
    message: 'Email is too long',
  })
  email: string;

  @ApiProperty({
    example: 'john_doe',
  })
  @IsString({
    message: 'Username must be a string',
  })
  @MinLength(3, {
    message: 'Username is too short',
  })
  @MaxLength(20, {
    message: 'Username is too long',
  })
  username: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString({
    message: 'Password must be a string',
  })
  @MinLength(8, {
    message: 'Password is too short',
  })
  @MaxLength(256, {
    message: 'Password is too long',
  })
  password: string;
}
