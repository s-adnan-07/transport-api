import { Injectable } from '@nestjs/common'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { GetVehicleDto } from './dto/get-vehicle.dto'

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  create(createVehicleDto: CreateVehicleDto) {
    return 'This action adds a new vehicle'
  }

  async findAll() {
    return this.prisma.vehicle.findMany({
      include: { schedules: { select: { schedule: true } } },
    })
  }

  findAvailable({ startDate, duration_in_days }: GetVehicleDto) {
    const current_event_start_date = new Date(startDate)
    const current_event_end_date = new Date(startDate)

    current_event_end_date.setDate(
      current_event_end_date.getDate() + duration_in_days,
    )

    return this.prisma.vehicle.findMany({
      where: {
        schedules: {
          none: {
            schedule: {
              startDate: { lt: current_event_end_date },
              endDate: { gt: current_event_start_date },
            },
          },
        },
      },
    })
  }

  findOne(id: number) {
    return this.prisma.vehicle.findFirst({
      where: { id },
      include: { schedules: { select: { schedule: true } } },
    })
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`
  }
}
