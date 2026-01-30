import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString({
    message: 'Email must be a string',
  })
  email: string;

  @ApiProperty()
  @IsString({
    message: 'Password must be a string',
  })
  password: string;
}
