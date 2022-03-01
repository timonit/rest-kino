import { Module } from '@nestjs/common';
import { FilmController } from './infrastructure/controller/film/film.controller';

@Module({
  controllers: [FilmController]
})
export class FilmModule {}
