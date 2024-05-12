import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { VehiclesModule } from './vehicles/vehicles.module'
import { PrismaModule } from './prisma/prisma.module'
import { SchedulesModule } from './schedules/schedules.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    VehiclesModule,
    SchedulesModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
