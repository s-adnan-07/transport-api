import {
  IsDateString,
  IsNotEmpty,
  IsNotIn,
  IsNumberString,
} from 'class-validator'

export class GetVehicleDto {
  @IsDateString({ strict: true })
  @IsNotEmpty()
  startDate: string

  @IsNumberString({ no_symbols: true })
  @IsNotIn(['0'])
  @IsNotEmpty()
  duration_in_days: number

  // @IsDateString({ strict: true })
  // @IsNotEmpty()
  // endDate: string
}
