import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common'
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core'
import { Prisma } from '@prisma/client'

const RECORD_NOT_FOUND = 'P2025'

// Note: Exception filters need to be put in controllers not services
@Catch(Prisma.PrismaClientKnownRequestError)
export class SchedulesFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(SchedulesFilter.name)

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()
    const errorCode = exception.code
    const statusCode =
      errorCode == RECORD_NOT_FOUND
        ? HttpStatus.NOT_FOUND
        : HttpStatus.INTERNAL_SERVER_ERROR

    this.logger.error(exception)

    const responseBody = {
      errorCode,
      statusCode,
      message: exception.meta,
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode)
  }
}
