import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({
    example: '123',
  })
  id: string;

  @ApiProperty({
    example: 'Example',
  })
  title: string;

  @ApiProperty({
    type: [Number],
    example: [1, 2, 3],
  })
  authors: number[];

  @ApiProperty({
    type: [Number],
    example: [1, 2, 3],
  })
  genres: number[];
}
