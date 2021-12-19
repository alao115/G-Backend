import consola from 'consola'
import createError from 'http-errors'
import { Server } from 'http'
import { Request, Response, NextFunction, } from 'express'
import { AddressInfo } from 'net';

export function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
}

export function onError<T extends NodeJS.ErrnoException>({ error, port }: { error: T; port: number; }) {
  console.log('Error: ', error)
  if (error && error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    `Pipe ${port}` :
    `Port ${port}`;
  if (error) {
    switch (error.code) {
      case 'EACCES':
        consola.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        consola.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

}

export function onListening({ server }: { server: Server; }) {
  const addr = server.address();
  /* const bind = typeof addr === 'string' ?
      `pipe ${  addr}` :
      `port ${  addr?.port}`; */

  consola.success(`Http server start on: http://localhost:${(addr as AddressInfo).port}`)
}

export function handle404(_req: Request, _res: Response, next: NextFunction) {
  next(new createError.NotFound("Route not found"));
}

export function basicErrorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  // set locals, only providing error in development

  /* if (res.headersSent) return next(err);

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; */

  res.status(err.status || 500);
  err.message = req.app.get('env') === 'development' ? err.message : new createError.InternalServerError();
  res.send({ error: { status: err.status, message: err.message } });
}
