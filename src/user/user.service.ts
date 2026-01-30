import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Roles } from './roles/roles';
import { User } from '@prisma/client';
import { DEFAULT_ROLE } from './roles/default-role';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    const rolesArr = Object.values(Roles);

    for (const roleName of rolesArr) {
      await this.prismaService.role.upsert({
        where: {
          name: roleName,
        },
        update: {},
        create: {
          name: roleName,
        },
      });
    }
  }

  async createUser(
    name: string,
    email: string,
    passwordHash: string,
  ): Promise<User> {
    const users = this.prismaService.user;

    const usernameTaken = await users.findUnique({
      where: {
        name,
      },
    });
    if (usernameTaken) throw new BadRequestException('Username already in use');

    const emailTaken = await users.findUnique({
      where: {
        email,
      },
    });
    if (emailTaken) throw new BadRequestException('Email already in use');

    const role = await this.prismaService.role.findUnique({
      where: {
        name: DEFAULT_ROLE,
      },
    });

    if (!role) {
      throw new Error(`Role "${DEFAULT_ROLE}" does not exist`);
    }

    return await users.create({
      data: {
        name,
        email,
        password: passwordHash,
        roles: {
          connect: {
            id: role.id,
          },
        },
      },
    });
  }

  async findByName(name: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        name,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
