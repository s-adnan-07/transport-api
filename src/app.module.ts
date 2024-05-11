import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { VehiclesModule } from './vehicles/vehicles.module'
import { OperationsModule } from './operations/operations.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    VehiclesModule,
    OperationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
