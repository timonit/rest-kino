import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Film, IFilm } from '../../models/film/film';
import { FilmDTO } from '../../dto/film.dto';
import { Types, Document, HydratedDocument } from 'mongoose';
import { ProductionCompanyModel } from '../../models/production-company';
import { ProductionCompanyDTO } from '../../dto/production-company.dto';
import { GenreDTO } from '../../dto/genre.dto';
import { Genre } from '../../models/genre/genre';

@Controller('film')
export class FilmController {
  @Get(':id')
  async getFilm(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await Film.findOne({
        id: Number(id),
      }).exec();
      if (result) {
        const companies = await ProductionCompanyModel.find({
          _id: result.production_companies,
        }).exec();
        const genres = await Genre.find({
          _id: result.genres,
        }).exec();
        response.send({
          ...result.toJSON(),
          genres: genres.map((doc) => doc.toJSON()),
          production_companies: companies.map((doc) => doc.toJSON()),
        });
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  @Get()
  async allFilms(): Promise<HydratedDocument<IFilm>[]> {
    return Film.find().exec();
  }

  @Patch(':id')
  async patchFilm(
    @Param('id') id: number,
    @Body() dto: Partial<FilmDTO>,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const film = await Film.findOne({ id: Number(id) }).exec();
      if (film) {
        film.update(dto);
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      return error;
    }
  }

  @Post()
  async addFilm(@Body() filmDTO: FilmDTO): Promise<FilmDTO> {
    try {
      const companiesObjectID = await this.findOrCreateProductionCompanies(
        filmDTO.production_companies,
      );
      const genresObjectID = await this.findOrCreateGenres(filmDTO.genres);
      console.log(companiesObjectID);
      console.log(genresObjectID);
      const film: HydratedDocument<IFilm> = new Film({
        ...filmDTO,
        production_companies: companiesObjectID,
        genres: genresObjectID,
      });
      film.save();
      return filmDTO;
    } catch (error) {
      return error;
    }
  }

  async findOrCreateProductionCompanies(
    companiesDTO: ProductionCompanyDTO[],
  ): Promise<Types.ObjectId[]> {
    const companies = [];
    for (let i = 0; i < companiesDTO.length; i++) {
      let company = await ProductionCompanyModel.findOne({
        id: companiesDTO[i].id,
      }).exec();
      if (!company) {
        company = new ProductionCompanyModel(companiesDTO[i]);
        company.save();
      }
      companies.push(company);
    }

    return companies.map((company) => company._id);
  }

  async findOrCreateGenres(genresDTO: GenreDTO[]): Promise<Types.ObjectId[]> {
    const genres = [];
    for (let i = 0; i < genresDTO.length; i++) {
      let genre = await Genre.findOne({
        id: genresDTO[i].id,
      }).exec();
      console.log('GENRE', genre);
      if (!genre) {
        genre = new Genre(genresDTO[i]);
        genre.save();
      }
      genres.push(genre);
    }

    return genres.map((genre) => genre._id);
  }
}
