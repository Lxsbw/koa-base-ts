/*
 * @Author: zhixiong.fu
 * @Date: 2021-01-08 21:19:14
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-09 14:06:12
 */

import Koa from 'koa';
import logger from 'koa-logger';
import bodyparser from 'koa-bodyparser';
// import body from 'koa-body';
import json from 'koa-json';
// import * as mongoose from 'mongoose';
import { connect as MongoConnect } from 'mongoose';
import { appRouters } from './routes/router'; // 路由
import { sysConfig, getMongoUrl } from './config/config.default'; // 配置
import { ControllerMap } from './handle/koaswagger';
import { KJSRouter } from 'koa-joi-swagger-ts';
import Router from 'koa-router';

class App {
  public app: Koa;

  constructor() {
    console.log('app初始化');

    this.app = new Koa();
    this.swaggerInit();
    this.middleware();
    this.routes();
    this.mongo();
    this.launchConf();
  }

  private swaggerInit(): void {
    const router = new KJSRouter({
      swagger: '2.0',
      info: {
        description: 'This is a sample server',
        title: 'Swagger',
        version: '1.0.0'
      },
      host: `${sysConfig.host}:${sysConfig.port}`,
      basePath: '',
      schemes: ['http', 'https'],
      paths: {},
      definitions: {}
    });

    ControllerMap(router);
    router.setSwaggerFile('swagger.json');
    router.loadSwaggerUI('/api-docs/swagger');
    console.log('swagger:' + JSON.stringify(router.getSwaggerFile()));
    // fs.writeFileSync('./swagger.json', JSON.stringify(router.getSwaggerFile()));

    this.app
      .use(router.getRouter().routes())
      .use(router.getRouter().allowedMethods());
  }

  private middleware(): void {
    this.app.use(
      bodyparser({
        enableTypes: ['json', 'form', 'text']
      })
    );
    // this.app.use(body());
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
    // const re = new Router();
    // re.get('/', async (ctx: Koa.Context, next: Koa.Next) => {
    //   ctx.body = 'Hello Koa 2 TypeScript!';
    // });

    // this.app.use(re.routes()).use(re.allowedMethods());

    this.app.use(appRouters.routes());
    this.app.use(appRouters.allowedMethods());
  }

  private mongo(): void {
    console.log(getMongoUrl());

    MongoConnect(getMongoUrl(), {
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
