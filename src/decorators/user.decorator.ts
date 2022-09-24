import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const reqBody = ctx.switchToHttp().getRequest();
    return reqBody.user;
  },
);
