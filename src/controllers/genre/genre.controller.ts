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
import { Genre } from '../../models/genre/genre';
import { GenreDTO } from '../../dto/genre.dto';

@Controller('genres')
export class GenreController {
  @Post()
  addGenre(@Body() dto: GenreDTO, @Res() response: Response): void {
    try {
      const newGenre = new Genre(dto);
      newGenre.save();
      response.send();
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  @Get('/:id')
  async getGenre(@Param('id') id: string): Promise<GenreDTO | null> {
    return Genre.findOne({ id }).exec();
  }

  @Patch('/:id')
  async updateGenre(
    @Param('id') id: string,
    @Body() partialDto: Partial<GenreDTO>,
  ): Promise<GenreDTO> {
    try {
      const genre = await Genre.findOne({ id }).exec();
      if (genre) {
        return await genre.update(partialDto);
      }
      throw new Error('Genre not found');
    } catch (e) {
      return e;
    }
  }

  @Delete('/:id')
  async deleteGenre(@Param('id') id: string): Promise<GenreDTO | null> {
    try {
      return await Genre.findOneAndRemove({ id }).exec();
    } catch (e) {
      return e;
    }
  }
}
