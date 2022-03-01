import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmModule } from './modules/film/film.module';

@Module({
  imports: [
    FilmModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
