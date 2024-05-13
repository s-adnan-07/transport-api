import { Injectable, Logger } from '@nestjs/common'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { Prisma, VehicleType } from '@prisma/client'
import { VehiclesService } from '@/vehicles/vehicles.service'

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(SchedulesService.name)

  create(
    vehiclesIds: number[],
    data: Prisma.ScheduleCreateWithoutVehiclesInput,
  ) {
    const startDate = new Date(data.startDate)
    const endDate = new Date(data.endDate)

    endDate.setDate(endDate.getDate() + data.duration_in_days)

    return this.prisma.schedule.create({
      data: {
        ...data,
        startDate,
        endDate,
        vehicles: {
          create: vehiclesIds.map(id => ({
            vehicle: {
              connect: {
                id,
                schedules: {
                  none: {
                    schedule: {
                      startDate: { lt: endDate },
                      endDate: { gt: startDate },
                    },
                  },
                },
              },
            },
          })),
        },
      },
      include: { vehicles: { select: { vehicle: true } } },
    })
  }

  findAll() {
    return this.prisma.schedule.findMany({
      include: { vehicles: { select: { vehicle: true } } },
    })
  }

  findOne(id: number) {
    return this.prisma.schedule.findFirst({
      where: { id },
      include: { vehicles: { select: { vehicle: true } } },
    })
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`
  }

  // TODO: handle prisma errors
  remove(id: number) {
    return this.prisma.schedule.delete({ where: { id } })
  }
}
