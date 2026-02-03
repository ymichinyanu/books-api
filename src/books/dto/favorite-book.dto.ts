import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FavoriteBookDto {
  @ApiProperty({
    example: '123',
  })
  @IsNumberString(
    {
      no_symbols: true,
    },
    {
      message: 'Book id must be a number string',
    },
  )
  bookId: string;
}
