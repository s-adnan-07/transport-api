import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator'

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  source: string

  @IsString()
  @IsNotEmpty()
  destination: string

  @IsDateString({ strict: true })
  @IsNotEmpty()
  startDate: string

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  duration_in_days: number

  // Note: Maybe take bigint, coz scaling issues
  @IsInt({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  vehicleIds: number[]

  // @IsNotEmptyObject()
  // @IsValidVehicle()
  // vehicles: Partial<Record<VehicleType, number>>
}
