import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Logger,
} from '@nestjs/common'
import { SchedulesService } from './schedules.service'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { SchedulesFilter } from './schedules.filter'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@ApiTags('Schedules')
@Controller('schedules')
@UseFilters(SchedulesFilter)
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  private readonly logger = new Logger(SchedulesController.name)

  // TODO: Add a response interceptor to modify response messages
  @ApiBody({ type: CreateScheduleDto })
  @Post()
  create(@Body() { vehicleIds, ...createScheduleDto }: CreateScheduleDto) {
    this.logger.log('POST /schedules')
    const endDate = createScheduleDto.startDate

    return this.schedulesService.create(vehicleIds, {
      endDate,
      ...createScheduleDto,
    })
  }

  @Get()
  findAll() {
    this.logger.log('GET /schedules')
    return this.schedulesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`GET /schedules/${id}`)
    return this.schedulesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    this.logger.log(`PATCH /schedules/${id}`)
    return this.schedulesService.update(+id, updateScheduleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`DELETE /schedules/${id}`)
    return this.schedulesService.remove(+id)
  }
}
