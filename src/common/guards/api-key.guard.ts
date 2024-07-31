import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly API_KEY = 'YOUR_API_KEY'; 

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    if (apiKey !== this.API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}
