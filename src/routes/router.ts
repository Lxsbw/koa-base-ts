/*
 * @Author: zhixiong.fu
 * @Date: 2021-01-08 22:06:22
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-09 01:26:33
 */

import { Context, Next } from 'koa';
import KoaRouter from 'koa-router';
import { MobilePhone } from '../controller/mobile-phone';

class AppRouter {
  public appRouter: KoaRouter;

  public constructor() {
    this.appRouter = new KoaRouter();
    this.init();
  }

  private init() {
    this.appRouter.get('/', async (ctx: Context, next: Next) => {
      ctx.body = 'Hello Koa 2 TypeScript!';
    });

    this.appRouter.get('/api/mobile-phone/findone', MobilePhone.findOne);
    this.appRouter.get('/api/mobile-phone/findall', MobilePhone.findAll);
    this.appRouter.post('/api/mobile-phone/save', MobilePhone.save);
    this.appRouter.put('/api/mobile-phone/update', MobilePhone.update);
    this.appRouter.delete('/api/mobile-phone/delete', MobilePhone.delete);
  }
}

export const appRouters = new AppRouter().appRouter;
