import { IsDateString, IsInt, IsNotEmpty, IsPositive } from 'class-validator'

export class GetVehicleDto {
  @IsDateString({ strict: true })
  @IsNotEmpty()
  startDate: string

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  duration_in_days: number

  // @IsDateString({ strict: true })
  // @IsNotEmpty()
  // endDate: string
}
