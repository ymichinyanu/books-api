import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GenreDto } from './dto/genre.dto';

@Injectable()
export class GenresService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGenre(name: string): Promise<GenreDto> {
    const genre = await this.prismaService.bookGenre.findUnique({
      where: {
        name,
      },
    });

    if (genre) throw new BadRequestException('Genre already exists');

    return await this.prismaService.bookGenre.create({
      data: {
        name,
      },
    });
  }

  async getAllGenres(): Promise<GenreDto[]> {
    return await this.prismaService.bookGenre.findMany();
  }

  async getGenre(id: number): Promise<GenreDto> {
    const genre = await this.prismaService.bookGenre.findUnique({
      where: {
        id,
      },
    });

    if (!genre) throw new NotFoundException();

    return genre;
  }
}
