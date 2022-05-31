import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Film, IFilm } from '../../models/film/film';
import { FilmDTO } from '../../dto/film.dto';
import { Types, HydratedDocument } from 'mongoose';
import { ProductionCompanyModel } from '../../models/production-company';
import { ProductionCompanyDTO } from '../../dto/production-company.dto';
import { GenreDTO } from '../../dto/genre.dto';
import { Genre } from '../../models/genre/genre';

@Controller('film')
export class FilmController {
  /**
   * Query film by id 
   */
  @Get(':id')
  async getFilm(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await Film.findOne({
        id: Number(id),
      })
        .populate('genres')
        .populate('production_companies')
        .exec();
      response.send(result);
    } catch (error: any) {
      response.status(400).send(error.message);
    }
  }

  /**
   * Query all films
   */
  @Get()
  async allFilms(): Promise<HydratedDocument<IFilm>[]> {
    return Film.find({})
      .populate('genres')
      .populate('production_companies')
      .exec();
  }

  /**
   * Update film with id 
   */
  @Patch(':id')
  async patchFilm(
    @Param('id') id: number,
    @Body() dto: Partial<FilmDTO>,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const film = await Film.findOne({ id: Number(id) }).exec();
      if (film) {
        response.send(Film.updateOne(dto).exec());
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add film
   */
  @Post()
  async addFilm(@Body() filmDTO: FilmDTO): Promise<FilmDTO> {
    try {
      const companiesObjectID = await this.findOrCreateProductionCompanies(
        filmDTO.production_companies,
      );
      const genresObjectID = await this.findOrCreateGenres(filmDTO.genres);
      const film: HydratedDocument<IFilm> = new Film({
        ...filmDTO,
        production_companies: companiesObjectID,
        genres: genresObjectID,
        watched: false,
      });
      film.save();
      return filmDTO;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove film with id
   */
  @Delete(':id')
  async deleteFilm(@Param('id') id: number): Promise<any> {
    return Film.deleteOne({ id }).exec();
  }

  /**
   * Find or create production companies
   */
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

  /**
   * Find or create genres
   */
  async findOrCreateGenres(genresDTO: GenreDTO[]): Promise<Types.ObjectId[]> {
    const genres = [];
    for (let i = 0; i < genresDTO.length; i++) {
      let genre = await Genre.findOne({
        id: genresDTO[i].id,
      }).exec();
      if (!genre) {
        genre = new Genre(genresDTO[i]);
        genre.save();
      }
      genres.push(genre);
    }

    return genres.map((genre) => genre._id);
  }
}
