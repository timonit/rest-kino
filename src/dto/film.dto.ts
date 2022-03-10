import { GenreDTO } from './genre.dto';
import { ProductionCompanyDTO } from './production-company.dto';
import { ProductionCountryDTO } from './production-country.dto';
import { SpokenLanguageDTO } from './spoken-language.dto';
import { Status } from './status.type';

export type FilmDTO = {
  adult: false;
  backdrop_path?: string;
  belongs_to_collection?: any;
  budget: number;
  genres: GenreDTO[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview?: string;
  popularity: number;
  poster_path?: string;
  production_companies: ProductionCompanyDTO[];
  production_countries: ProductionCountryDTO[];
  release_date: string;
  revenue: number;
  runtime?: number;
  spoken_languages: SpokenLanguageDTO[];
  status: Status;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  watched?: boolean;
}
