import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common'
import { SchedulesService } from './schedules.service'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { SchedulesFilter } from './schedules.filter'

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  // TODO: Add a response interceptor to modify response messages
  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters(SchedulesFilter)
  create(@Body() { vehicleIds, ...createScheduleDto }: CreateScheduleDto) {
    const endDate = createScheduleDto.startDate

    return this.schedulesService.create(vehicleIds, {
      endDate,
      ...createScheduleDto,
    })
  }

  @Get()
  findAll() {
    return this.schedulesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(+id, updateScheduleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(+id)
  }
}
