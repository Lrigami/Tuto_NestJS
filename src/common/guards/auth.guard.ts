import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable() 
// CanActivate is an interface that determines if a request is authorised or not
export class AuthGuard implements CanActivate {
    // ExecutionContext is a object that contains request execution information, and returns a boolean
    canActivate(context: ExecutionContext): boolean {
        // methods that retrieve and type the http request with Request
        const request = context.switchToHttp().getRequest<Request>();
        // retrieve token from header
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Unauthorized');
        }
        if (token !== '123456789') {
            throw new UnauthorizedException('Unauthorized');
        }
        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === "Bearer" ? token : undefined;
    }
}