import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenreController } from './controllers/genre/genre.controller';
import { FilmController } from './controllers/film/film.controller';

@Module({
  imports: [],
  controllers: [
    FilmController,
    GenreController,
    // AppController,
  ],
  providers: [AppService],
})
export class AppModule {
}
