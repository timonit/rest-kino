import { Schema, model, Types, Document } from 'mongoose';

interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

const ProductionCountry = {
  iso_3166_1: String,
  name: String,
};

interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

const SpokenLanguage = {
  english_name: String,
  iso_639_1: String,
  name: String,
};

export interface IFilm {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Schema.Types.ObjectId[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Types.ObjectId[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  watched: boolean;
}

const FilmSchema = new Schema<IFilm>({
  adult: Boolean,
  backdrop_path: String,
  belongs_to_collection: String,
  budget: Number,
  genres: [Schema.Types.ObjectId],
  homepage: String,
  id: Number,
  imdb_id: String,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  production_companies: [Types.ObjectId],
  production_countries: [ProductionCountry],
  release_date: String,
  revenue: Number,
  runtime: Number,
  spoken_languages: [SpokenLanguage],
  status: String,
  tagline: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  watched: Boolean,
});

export const Film = model<IFilm>('Film', FilmSchema);

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
