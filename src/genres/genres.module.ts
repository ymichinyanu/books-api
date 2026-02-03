import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [GenresController],
  providers: [GenresService],
  imports: [PrismaModule],
})
export class GenresModule {}
