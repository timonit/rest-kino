import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductionCompanyModel } from '../../models/production-company';
import { ProductionCompanyDTO } from '../../dto/production-company.dto';

@Controller('production-company')
export class ProductionCompanyController {
  @Get(':id')
  async getCompany(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await ProductionCompanyModel.findOne({
        id: Number(id),
      }).exec();
      response.send(result);
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  @Post()
  async addCompany(
    @Body() companyDTO: ProductionCompanyDTO,
  ): Promise<ProductionCompanyDTO> {
    try {
      const film = new ProductionCompanyModel(companyDTO);
      film.save();
      return film;
    } catch (error) {
      return error;
    }
  }
}
