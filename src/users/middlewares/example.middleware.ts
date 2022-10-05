import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Example MiddleWare');
    console.log(req.headers.authorization);
    
    const { authorization } = req.headers;

    if (!authorization)
      throw new HttpException('No Authorization Token', HttpStatus.FORBIDDEN);
    
    if (authorization === 'abxscaaasv') next();
    else 
      throw new HttpException('Invalid Authorization Token', HttpStatus.FORBIDDEN);
  }
}
