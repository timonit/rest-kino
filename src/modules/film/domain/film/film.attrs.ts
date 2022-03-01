import { ProductionCompanyEntity } from '../production-company/production-company.entity';
import { GenreEntity } from '../genre/genre.entity';
import { ProductionCountryValueObject } from './ProductionCountry.value-object';
import { SpokenLanguageValueObject } from './SpokenLanguage.value-object';
import { Status } from './types';

export type FilmAttrs = {
  adult: false;
  backdrop_path?: string;
  belongs_to_collection?: any;
  budget: number;
  genres: GenreEntity[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview?: string;
  popularity: number;
  poster_path?: string;
  production_companies: ProductionCompanyEntity[];
  production_countries: ProductionCountryValueObject[];
  release_date: string;
  revenue: number;
  runtime?: number;
  spoken_languages: SpokenLanguageValueObject[];
  status: Status;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  watched?: boolean;
}


// export const FilmAttrsExemple: FilmAttrs = {
//   adult: false,
//   backdrop_path: '/rr7E0NoGKxvbkb89e.R1GwfoYjpA.jpg',
//   belongs_to_collection: null,
//   budget: 63000000,
//   genres: [{ 'id': 18, 'name': 'Drama' }],
//   homepage: 'http://www.foxmovies.com/movies/fight-club',
//   id: 550,
//   imdb_id: 'tt0137523',
//   original_language: 'en',
//   original_title: 'Fight Club',
//   overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male',
//   popularity: 49.158,
//   poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
//   production_companies: [{
//     id: 508,
//     logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png',
//     name: 'Regency Enterprises',
//     origin_country: 'US',
//   }],
//   production_countries: [{ iso_3166_1: 'DE', name: 'Germany' }],
//   release_date: '1999-10-15',
//   revenue: 100853753,
//   runtime: 139,
//   spoken_languages: [{ 'english_name': 'English', 'iso_639_1': 'en', 'name': 'English' }],
//   status: 'Released',
//   tagline: 'Mischief. Mayhem. Soap.',
//   title: 'Fight Club',
//   video: false,
//   vote_average: 8.4,
//   vote_count: 21807,
// }
