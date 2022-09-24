import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

class ResponseBody {
  statusCode: number;
  message: unknown;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const isHttpException = exception instanceof HttpException;

    const httpStatus = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = isHttpException
      ? (exception['response']['message'] as string)
      : 'Server error';

    message = message === undefined ? exception['response'] : message;

    const responseBody: ResponseBody = {
      statusCode: httpStatus,
      message: message,
    };

    console.warn(exception);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
