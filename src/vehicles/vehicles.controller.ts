import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
  Logger,
} from '@nestjs/common'
import { VehiclesService } from './vehicles.service'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { GetVehicleDto } from './dto/get-vehicle.dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  private readonly logger = new Logger(VehiclesController.name, {
    timestamp: true,
  })

  @Post()
  @ApiBody({ type: CreateVehicleDto })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    this.logger.log('POST /vehicles')
    return this.vehiclesService.create(createVehicleDto)
  }

  @Get()
  findAll() {
    this.logger.log('GET /vehicles')
    return this.vehiclesService.findAll()
  }

  @Get('available')
  @UsePipes(ValidationPipe)
  findAvailable(@Query() getVehicleDto: GetVehicleDto) {
    this.logger.log('GET /vehicles/available')
    return this.vehiclesService.findAvailable(getVehicleDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`GET /vehicles/${id}`)
    return this.vehiclesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    this.logger.log(`PATCH /vehicles/${id}`)
    return this.vehiclesService.update(+id, updateVehicleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`DELETE /vehicles/${id}`)
    return this.vehiclesService.remove(+id)
  }
}
