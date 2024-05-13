import { Controller, Get, Logger } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name, { timestamp: true })

  @Get()
  getHello(): string {
    this.logger.log('GET /')
    return this.appService.getHello()
  }
}
