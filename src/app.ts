/*
 * @Author: zhixiong.fu
 * @Date: 2021-01-08 21:19:14
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-08 23:58:50
 */

import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as mongoose from 'mongoose';
import { appRouters } from './routes/router'; // 路由
import { sysConfig, getMongoUrl } from './config/config.default'; // 配置

class App {
  public app: Koa;

  constructor() {
    console.log('app初始化');

    this.app = new Koa();
    this.middleware();
    this.routes();
    this.mongo();
    this.launchConf();
  }

  private middleware(): void {
    this.app.use(
      bodyparser({
        enableTypes: ['json', 'form', 'text']
      })
    );
    this.app.use(json());
    this.app.use(logger());
    this.app.use(require('koa-static')(__dirname + '/public'));

    // logger
    this.app.use(async (ctx: Koa.Context, next: Koa.Next) => {
      const start = new Date();
      await next();
      const ms = new Date().valueOf() - start.valueOf();
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
  }

  private routes(): void {
    this.app.use(appRouters.routes());
    this.app.use(appRouters.allowedMethods());
  }

  private mongo(): void {
    console.log(getMongoUrl());
    mongoose
      .connect(getMongoUrl(), {
        useCreateIndex: true,
        poolSize: 5, // 连接池中维护的连接数
        useNewUrlParser: true,
        autoIndex: false,
        useUnifiedTopology: true
        // keepAlive: 120,
      })
      .then((open) => {
        console.log('📚  mongodb is launching...');
      })
      .catch((err) => {
        console.error.bind(console, `connection error:${err}`);
      });
  }

  private launchConf() {
    // error-handling
    this.app.on('error', (err, ctx) => {
      console.error('server error', err, ctx);
    });

    console.log('====================================');
    console.log('🚀  Your awesome APP is launching...');
    console.log('====================================');

    this.app.listen(sysConfig.port /*this.app.get('port')*/, () => {
      console.log('====================================');
      console.log(`✅  http://${sysConfig.host}:${sysConfig.port}`);
      console.log(
        `✅  http://${sysConfig.host}:${sysConfig.port}/api-docs/swagger`
      );
      console.log(`✅  Your awesome APP launched ${this.app.env}`);
      console.log('====================================');
    });
  }
}

export default new App().app;
