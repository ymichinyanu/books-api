import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorDto } from './dto/author.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { RequireRole } from '../auth/decorators/require-role.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: AuthorDto,
  })
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[Admin] Create a new author' })
  @RequireRole(['Admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async createAuthor(@Body() dto: CreateAuthorDto): Promise<AuthorDto> {
    return await this.authorsService.createAuthor(dto.name);
  }

  @Get()
  @ApiOkResponse({
    type: AuthorDto,
    isArray: true,
  })
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[Admin] Get a list of all authors' })
  @RequireRole(['Admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async listAuthors(): Promise<AuthorDto[]> {
    return await this.authorsService.getAllAuthors();
  }

  @Get(':id')
  @ApiOkResponse({
    type: AuthorDto,
  })
  @ApiOperation({ summary: 'Get information about a specific author' })
  async getAuthor(@Param('id') id: number): Promise<AuthorDto> {
    return this.authorsService.getAuthor(id);
  }
}
