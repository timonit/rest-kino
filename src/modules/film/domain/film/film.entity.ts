import { Entity } from '@timonit/backend-core';
import { FilmAttrs } from './film.attrs';
import { ProductionCompanyEntity } from '../production-company/production-company.entity';
import { GenreEntity } from '../genre/genre.entity';

export class FilmEntity extends Entity<FilmAttrs> {
  constructor(attrs: FilmAttrs) {
    super(attrs);
    if (!attrs.watched) {
      this.unwatched();
    }
  }

  patchAttrs(attrs: Partial<FilmAttrs>): void {
    this.attrs = {...this.attrs, ...attrs };
  }

  getProductionCompanies(): ProductionCompanyEntity[] {
    return this.attrs.production_companies;
  }

  getGenries(): GenreEntity[] {
    return this.attrs.genres;
  }

  watched() {
    this.attrs.watched = true;
  }

  unwatched() {
    this.attrs.watched = false;
  }
}
