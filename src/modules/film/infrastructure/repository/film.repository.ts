import { FilmEntity, FilmRepositoryInterface } from '../../domain';
import { ProductionCompanyRepository } from './production-company.repository';
import { ProductionCompanyEntity } from '../../domain/production-company/production-company.entity';
import { GenreEntity } from '../../domain/genre/genre.entity';
import { GenreRepository } from './genre.repository';
import { FilmAttrs } from '../../domain/film/film.attrs';

export class FilmRepository implements FilmRepositoryInterface {
  static films: FilmEntity[] = [];

  companyRepo = new ProductionCompanyRepository();
  genreRepo = new GenreRepository();

  saveCompanies(companies: ProductionCompanyEntity[]): void {
    companies.forEach((company: ProductionCompanyEntity) => {
      if (!this.companyRepo.hasCompanyWithId(company.attrs.id)) {
        this.companyRepo.add(company);
      }
    })
  }

  saveGenries(genries: GenreEntity[]): void {
    genries.forEach((genre: GenreEntity) => {
      if (!this.genreRepo.hasGenreWithId(genre.attrs.id)) {
        this.genreRepo.add(genre);
      }
    })
  }

  hasFilmWithId(id: number): boolean {
    const result = FilmRepository.films.findIndex((film) => film.attrs.id === id);
    return result >= 0;
  }

  async add(film: FilmEntity): Promise<void> {
    this.saveCompanies(film.getProductionCompanies());
    this.saveGenries(film.getGenries());

    FilmRepository.films.push(film);
  }

  async patch(id: number, attrs: Partial<FilmAttrs>): Promise<void> {
    const foundedFilm = FilmRepository.films.find((f) => f.attrs.id === id);
    if (!foundedFilm) {
      throw new Error(`Film with ${id} id, not founded`);
    }
    foundedFilm.patchAttrs(attrs);
  }

  all(): FilmEntity[] {
    return FilmRepository.films;
  }

  getFilm(id: number): FilmEntity {
    const result = FilmRepository.films.find(film => film.attrs.id === id);
    if (result) return result;
    throw new Error('Film not found');
  }
}
