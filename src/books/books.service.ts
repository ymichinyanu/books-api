import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createBook(
    title: string,
    authors: number[],
    genres: number[],
  ): Promise<BookDto> {
    const book = await this.prismaService.book.create({
      data: {
        title,
        authors: {
          connect: authors.map((id) => ({
            id,
          })),
        },
        genres: {
          connect: genres.map((id) => ({ id })),
        },
      },
      select: { id: true },
    });

    return {
      id: book.id.toString(),
      title,
      authors,
      genres,
    };
  }

  async getAllBooks(): Promise<string[]> {
    const rawBooks = await this.prismaService.book.findMany({
      select: { id: true },
    });

    return rawBooks.map((book) => book.id.toString());
  }

  async getBook(id: string): Promise<BookDto> {
    const rawBook = await this.prismaService.book.findUnique({
      where: {
        id: BigInt(id),
      },
      include: {
        authors: {
          select: {
            id: true,
          },
        },
        genres: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!rawBook) {
      throw new NotFoundException();
    }

    const book: BookDto = {
      id: rawBook.id.toString(),
      title: rawBook.title,
      authors: rawBook.authors.map((author) => author.id),
      genres: rawBook.authors.map((genre) => genre.id),
    };

    return book;
  }

  async deleteBook(id: string) {
    await this.prismaService.book.delete({
      where: {
        id: BigInt(id),
      },
    });
  }

  async addToFavorites(bookId: string, userId: string) {
    await this.prismaService.book.update({
      where: {
        id: BigInt(bookId),
      },
      data: {
        favoritedBy: {
          connect: {
            id: BigInt(userId),
          },
        },
      },
    });
  }

  async removeFromFavorites(bookId: string, userId: string) {
    await this.prismaService.book.update({
      where: {
        id: BigInt(bookId),
      },
      data: {
        favoritedBy: {
          disconnect: {
            id: BigInt(userId),
          },
        },
      },
    });
  }
}
