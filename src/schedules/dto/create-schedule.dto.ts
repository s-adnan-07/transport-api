import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator'

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  source: string

  @IsString()
  @IsNotEmpty()
  destination: string

  @IsDate()
  @IsNotEmpty()
  startDate: Date

  @IsInt()
  @IsNotEmpty()
  duration: number

  // Note: Maybe take bigint, coz scaling issues
  @IsInt({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  vehicleId: number[]
}
