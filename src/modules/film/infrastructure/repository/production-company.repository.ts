import { ProductionCompanyEntity } from '../../domain/production-company/production-company.entity';

export class ProductionCompanyRepository {
  static companies: ProductionCompanyEntity[] = [];

  async hasCompanyWithId(id: number): Promise<boolean> {
    const result = ProductionCompanyRepository
      .companies.findIndex((company) => company.attrs.id === id);
    return result >= 0;
  }

  async add(company: ProductionCompanyEntity): Promise<void> {
    ProductionCompanyRepository.companies.push(company);
  }
}
