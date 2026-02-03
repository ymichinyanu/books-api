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
import { GenresService } from './genres.service';
import { RequireRole } from '../auth/decorators/require-role.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreDto } from './dto/genre.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: GenreDto,
  })
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[Admin] Create a new genre' })
  @RequireRole(['Admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async createGenre(@Body() dto: CreateGenreDto): Promise<GenreDto> {
    return await this.genresService.createGenre(dto.name);
  }

  @Get()
  @ApiOkResponse({
    type: GenreDto,
    isArray: true,
  })
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[Admin] Get a list of all genres' })
  @RequireRole(['Admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async listGenres(): Promise<GenreDto[]> {
    return await this.genresService.getAllGenres();
  }

  @Get(':id')
  @ApiOkResponse({
    type: GenreDto,
  })
  @ApiOperation({ summary: 'Get information about a specific genre' })
  async getGenre(@Param('id') id: number): Promise<GenreDto> {
    return await this.genresService.getGenre(id);
  }
}
