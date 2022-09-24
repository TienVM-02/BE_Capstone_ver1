import { AccountEntity } from 'src/models/accounts/entities/account.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { RoleEnum } from 'src/common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    const req: Request = context.switchToHttp().getRequest();
    const user: AccountEntity = req.user as AccountEntity;

    return requiredRoles.some((role) => user.role.name === role);
  }
}
