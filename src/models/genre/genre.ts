import { Schema, model } from 'mongoose';

export interface IGenre {
  id: string;
  name: string;
}

const GenreSchema = new Schema<IGenre>({
  id: {
    unique: true,
    type: String,
  },
  name: {
    unique: true,
    type: String,
  },
});

export const Genre = model<IGenre>('Genre', GenreSchema);
