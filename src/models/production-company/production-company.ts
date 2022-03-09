import { Schema, model } from 'mongoose';

export interface IProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

const productionCompanySchema = new Schema<IProductionCompany>({
  id: Number,
  logo_path: String,
  name: String,
  origin_country: String,
});

export const ProductionCompanyModel = model<IProductionCompany>(
  'Production-Company',
  productionCompanySchema,
);
