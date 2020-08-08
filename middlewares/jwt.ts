import { Context, Status } from 'https://deno.land/x/oak/mod.ts';
import { validateJwt } from 'https://deno.land/x/djwt/validate.ts';

export const JwtConfig = {
    header: 'Authorization',
    schema: 'Bearer',
    secretKey: Deno.env.get("SECRET") || '',
    expirationTime: 60000,
    type: 'JWT',
    alg: 'HS256',
};

export async function jwtAuth(ctx: Context<Record<string, any>>, next: () => Promise<void>) {
    const token = ctx.request.headers.get(JwtConfig.header)?.replace(`${JwtConfig.schema}`, "");
    if (!token) {
        ctx.response.status = Status.Unauthorized;
        ctx.response.body = { message: 'Unauthorized' };
        return;
    }
    if (!(await validateJwt(token, JwtConfig.secretKey, { isThrowing: false}))) {
        ctx.response.status = Status.Unauthorized;
        ctx.response.body = { message: 'Wrong Token' };
        return;
    }
    await next();
}