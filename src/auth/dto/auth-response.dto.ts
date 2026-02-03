import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseUserObject {
  @ApiProperty({
    example: '123',
  })
  id: string;

  @ApiProperty({
    example: 'example@example.com',
  })
  email: string;

  @ApiProperty({
    example: 'john_doe',
  })
  name: string;
}

export class AuthResponseDto {
  @ApiProperty({
    type: AuthResponseUserObject,
  })
  user: AuthResponseUserObject;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
  })
  accessToken: string;
}
