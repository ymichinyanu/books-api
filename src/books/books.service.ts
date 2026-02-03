import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookDto } from './dto/book.dto';
import { Response } from 'express';
import * as fastcsv from 'fast-csv';

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

  async getAllBookIds(): Promise<string[]> {
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

  async exportBooks(res: Response) {
    const books = await this.prismaService.book.findMany({
      include: {
        authors: {
          select: {
            name: true,
          },
        },
        genres: {
          select: {
            name: true,
          },
        },
      },
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=books.csv');

    const csvStream = fastcsv.format({ headers: true });
    csvStream.pipe(res);

    for (const book of books) {
      const authors = book.authors.map((author) => author.name);
      const genres = book.genres.map((genre) => genre.name);

      csvStream.write({
        id: book.id.toString(),
        title: book.title,
        authors: authors.join(', '),
        genres: genres.join(', '),
      });
    }

    csvStream.end();
  }
}
