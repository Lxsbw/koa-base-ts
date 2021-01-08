/*
 * @Author: zhixiong.fu
 * @Date: 2021-01-08 22:06:22
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-08 23:39:58
 */

import * as Koa from 'koa';
import * as Router from 'koa-router';
import { MobilePhone } from '../controller/mobile-phone';

class AppRouter {
  public appRouter: Router;

  public constructor() {
    this.appRouter = new Router();
    this.init();
  }

  private init() {
    this.appRouter.get('/', async (ctx: Koa.BaseContext, next: Koa.Next) => {
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
