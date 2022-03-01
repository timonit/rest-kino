import { UseCase } from '../usecase';
import { WatchedFilmDto } from './watched-film.dto';
import { FilmRepository } from '../../infrastructure/repository/film.repository';

export class WatchedFilmUsecase implements UseCase {
  do(dto: WatchedFilmDto): void {
    const repository = new FilmRepository();
    repository.patch(dto.id, dto);
  }
}
