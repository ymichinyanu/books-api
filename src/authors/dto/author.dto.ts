import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
  @ApiProperty({
    example: 123,
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
  })
  name: string;
}
