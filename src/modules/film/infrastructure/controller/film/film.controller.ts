import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { FilmRepository } from '../../repository/film.repository';
import { FilmEntity } from '../../../domain';
import { AddFilmUseCase } from '../../../app/film/add-film.usecase';
import { AddFilmDto } from '../../../app/film/add-film.dto';
import { WatchedFilmDto } from '../../../app/film/watched-film.dto';
import { WatchedFilmUsecase } from '../../../app/film/watched-film.usecase';
import { Response } from 'express';

@Controller('film')
export class FilmController {
  repository = new FilmRepository();

  @Get(':id')
  getFilm(@Param('id') id: number, @Res() response: Response): void {
    try {
      const result = this.repository.getFilm(Number(id));
      response.send(result);
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  @Get()
  allFilms(): FilmEntity[] {
    return this.repository.all();
  }

  @Patch(':id')
  patchFilm(@Param('id') id: number, @Body() dto: WatchedFilmDto): void {
    try {
      new WatchedFilmUsecase().do({ ...dto, id: Number(id) });
    } catch (error) {
      return error;
    }
  }

  @Post()
  addFilm(@Body() film: AddFilmDto): void {
    try {
      new AddFilmUseCase().do(film);
    } catch (error) {
      return error;
    }
  }
}
