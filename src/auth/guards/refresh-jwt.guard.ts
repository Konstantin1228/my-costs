import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RefreshJWTGuard implements CanActivate {
    constructor(private userService: UsersService) { }

    async canActivate(context: ExecutionContext):
        //@ts-ignore
        boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const { refresh_token, userName } = request.body

        if (!refresh_token) throw new UnauthorizedException("поле refresh_token обязательно")
        if (!userName) throw new UnauthorizedException("поле userName обязательно")

        const user = await this.userService.findOne(userName)

        if (!user) throw new UnauthorizedException("пользователя не существует")

        return true
    }
}