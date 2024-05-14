import { VehicleType } from '@prisma/client'
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isObject,
} from 'class-validator'

const vehicleKeys = Object.values(VehicleType).join(' | ')

export const IsValidVehicle = (validationOptions?: ValidationOptions) => {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsRecord',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `All vehicles must be of type - ${vehicleKeys}`,
        ...validationOptions,
      },
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          if (!isObject(value)) return false
          if (Object.keys(value).length === 0) return true

          const keys = Object.keys(value)

          // ! Took me ages to figure out this line of code
          return keys.every(val => val in VehicleType)
        },
      },
    })
  }
}
