import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/')
  getResponse(@Query() url: string) {
    return this.appService.getResponse(url);
  }
}
