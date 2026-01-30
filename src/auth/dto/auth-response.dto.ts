import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseUserObject {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}

export class AuthResponseDto {
  @ApiProperty({
    type: AuthResponseUserObject,
  })
  user: AuthResponseUserObject;

  @ApiProperty()
  accessToken: string;
}
