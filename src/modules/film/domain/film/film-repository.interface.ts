import { FilmEntity } from './film.entity';

export interface FilmRepositoryInterface {
  add(film: FilmEntity): Promise<void>;
}
