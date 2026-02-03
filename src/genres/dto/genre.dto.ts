import { ApiProperty } from '@nestjs/swagger';

export class GenreDto {
  @ApiProperty({
    example: 123,
  })
  id: number;

  @ApiProperty({
    example: 'Fantasy',
  })
  name: string;
}
