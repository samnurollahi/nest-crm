import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(@Inject('LOG_PATH') private readonly logPath: string) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    //! check status for log
    if (status && status >= 500) {
      const log = {
        timestamp: new Date().toISOString(),
        status,
        path: req.url,
        method: req.method,
        body: req.body,
        response: exception.getResponse(),
      };
      fs.appendFile(this.logPath, JSON.stringify(log) + '\n', (err) => {
        if (err) console.log(err);
      });
    }

    res.status(status).json(exception.getResponse());
  }
}
