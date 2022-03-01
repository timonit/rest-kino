import { UseCase } from '../usecase';
import { FilmEntity } from '../../domain';
import { FilmRepository } from '../../infrastructure/repository/film.repository';
import { AddFilmDto } from './add-film.dto';
import { FilmAttrs } from '../../domain/film/film.attrs';
import { ProductionCompanyEntity } from '../../domain/production-company/production-company.entity';
import { GenreEntity } from '../../domain/genre/genre.entity';

export class AddFilmUseCase extends UseCase {
  static attrsFromDto(dto: AddFilmDto): FilmAttrs {
    return  {
      ...dto,
      production_companies: dto.production_companies.map((pc)=>new ProductionCompanyEntity(pc)),
      genres: dto.genres.map((g) => new GenreEntity(g)),
    };
  }

  do(dto: AddFilmDto): void {
    const repo = new FilmRepository();
    if (repo.hasFilmWithId(dto.id)) throw new Error('Film has been defined');

    const film = new FilmEntity(AddFilmUseCase.attrsFromDto(dto));
    repo.add(film);
  }
}
