import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString({
    message: 'Author name must be a string',
  })
  name: string;
}
