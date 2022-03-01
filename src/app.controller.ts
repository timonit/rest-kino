import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { AddFilmUseCase } from './modules/film/app/film/add-film.usecase';
// import { FilmEntity } from './modules/film/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
