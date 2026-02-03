import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

type UserGetById = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
    favoriteBooks: {
      select: {
        id: true;
      };
    };
    roles: {
      select: {
        name: true;
      };
    };
  };
}>;

export class UserDto {
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

  @ApiProperty({
    type: [String],
    example: ['1', '2', '3'],
  })
  favoriteBooks: string[];

  @ApiProperty({
    type: [String],
    example: ['User', 'Admin'],
  })
  roles: string[];

  constructor(user: UserGetById) {
    this.id = user.id.toString();
    this.email = user.email;
    this.name = user.name;
    this.favoriteBooks = user.favoriteBooks.map((book) => book.id.toString());
    this.roles = user.roles.map((role) => role.name);
  }
}
