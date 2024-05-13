import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common'
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core'
import { Prisma } from '@prisma/client'

const VEHICLE_NOT_AVAILABLE_EXCEPTION = 'P2025'

// Note: Exception filters need to be put in controllers not services
@Catch(Prisma.PrismaClientKnownRequestError)
export class SchedulesFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(SchedulesFilter.name)

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()
    const errorCode = exception.code
    const statusCode =
      errorCode == VEHICLE_NOT_AVAILABLE_EXCEPTION
        ? HttpStatus.FORBIDDEN
        : HttpStatus.INTERNAL_SERVER_ERROR

    const message =
      errorCode == VEHICLE_NOT_AVAILABLE_EXCEPTION
        ? 'One or more vehicles is not available for the specified time period'
        : exception.message

    // if (exception.code === ''){}

    this.logger.error(exception.message)

    const responseBody = {
      statusCode,
      message,
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode)
  }
}
