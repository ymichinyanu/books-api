import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: 'Example',
  })
  title: string;

  @ApiProperty({
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray({
    message: 'Authors must be an array',
  })
  @IsNumber({}, { each: true, message: 'Authors must be a number array' })
  authors: number[];

  @ApiProperty({
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray({
    message: 'Genres must be an array',
  })
  @IsNumber({}, { each: true, message: 'Genres must be a number array' })
  genres: number[];
}
