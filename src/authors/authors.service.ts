import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorDto } from './dto/author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAuthor(name: string): Promise<AuthorDto> {
    return await this.prismaService.author.create({
      data: {
        name,
      },
    });
  }

  async getAllAuthors(): Promise<AuthorDto[]> {
    return await this.prismaService.author.findMany();
  }

  async getAuthor(id: number): Promise<AuthorDto> {
    const author = await this.prismaService.author.findUnique({
      where: {
        id,
      },
    });

    if (!author) throw new NotFoundException();

    return author;
  }
}
