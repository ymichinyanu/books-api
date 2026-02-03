import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({
    example: 'Fantasy',
  })
  @IsString({
    message: 'Genre name must be a string',
  })
  name: string;
}
