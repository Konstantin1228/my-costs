import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    async canActivate(context: ExecutionContext):
        //@ts-ignore
        boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const { userName, password } = request.body
        const user = await this.authService.validateUser(userName)
        if (!user) throw new UnauthorizedException(`Пользователь ${userName} не существует!`)

        if (user.password !== password) throw new UnauthorizedException(`Неправильный пароль!`)

        return true
    }
} 