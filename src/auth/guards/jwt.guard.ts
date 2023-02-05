import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class JWTguard implements CanActivate {
    constructor(private authService: AuthService) { }

    async canActivate(context: ExecutionContext):
        //@ts-ignore
        boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(" ")[1]
        console.log(token);
        if (!token) throw new UnauthorizedException("ошибка авторизации")

        const validToken = this.authService.verifyToken(token)
        console.log(validToken);
        if (validToken?.error) throw new UnauthorizedException(validToken.error)

        return (request.token = token)
    }
}            