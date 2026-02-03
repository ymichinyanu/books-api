import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookDto } from './dto/book.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
} from '@nestjs/swagger';
import { RequireRole } from '../auth/decorators/require-role.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import express from 'express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: BookDto,
  })
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[Admin] Create a new book' })
  @RequireRole(['Admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async createBook(@Body() dto: CreateBookDto): Promise<BookDto> {
    return await this.booksService.createBook(
      dto.title,
      dto.authors,
      dto.genres,
    );
  }

  @Get()
  @ApiOkResponse({
    description: 'An array of book ids',
    isArray: true,
    example: '["34", "673", "23"]',
  })
  @ApiOperation({ summary: 'Get a list of all book IDs' })
  async listBooks(): Promise<string[]> {
    return await this.booksService.getAllBookIds();
  }

  @Get('by-id/:id')
  @ApiOkResponse({
    type: BookDto,
  })
  @ApiOperation({ summary: 'Get information about a specific book' })
  async getBook(@Param('id') id: string): Promise<BookDto> {
    return this.booksService.getBook(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[Admin] Delete a specific book' })
  @RequireRole(['Admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async deleteBook(@Param('id') id: string) {
    await this.booksService.deleteBook(id);
  }

  @Post('favorite/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiOperation({ summary: 'Add book to favorites' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  async addToFavorites(
    @Param('id') id: string,
    @Request() req: express.Request,
  ) {
    if (!req.user) throw new UnauthorizedException();

    await this.booksService.addToFavorites(id, req.user.id);
  }

  @Delete('favorite/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiOperation({ summary: 'Remove book from favorites' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  async removeFromFavorites(
    @Param('id') id: string,
    @Request() req: express.Request,
  ) {
    if (!req.user) throw new UnauthorizedException();

    await this.booksService.removeFromFavorites(id, req.user.id);
  }

  @Get('export')
  @ApiProduces('text/csv')
  @ApiOkResponse({
    description: 'CSV file with books',
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[Admin] Export all books in CSV format' })
  @RequireRole(['Admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async exportBooks(@Response() res) {
    await this.booksService.exportBooks(res);
  }
}
