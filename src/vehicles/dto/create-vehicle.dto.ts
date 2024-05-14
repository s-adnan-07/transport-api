import { ApiProperty } from '@nestjs/swagger'
import { VehicleType } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  plateNo: string

  @ApiProperty({ enum: VehicleType })
  @IsEnum(VehicleType)
  @IsNotEmpty()
  type: VehicleType
}
