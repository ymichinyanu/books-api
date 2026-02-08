import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { GenresModule } from './genres/genres.module';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        global: true,
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService],
      global: true,
    }),
    ServeStaticModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        if (configService.getOrThrow<string>('NODE_ENV') === 'production')
          return [];

        return [
          {
            rootPath: join(__dirname, '..', '..', 'public', 'demo'),
            serveRoot: '/demo',
          },
        ];
      },
      inject: [ConfigService],
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
    BooksModule,
    AuthorsModule,
    GenresModule,
  ],
})
export class AppModule {}
