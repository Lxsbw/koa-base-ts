/*
 * @Author: zhixiong.fu
 * @Date: 2021-01-08 21:42:05
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-09 14:11:17
 */

import * as Koa from 'koa';
import * as _ from 'lodash';
import {
  MobilePhoneQuery,
  MobilePhoneSaveIn,
  MobilePhoneSaveOut,
  MobilePhoneModifyIn,
  MobilePhoneDelIn,
  MobilePhoneQuery_SC,
  MobilePhoneSaveIn_SC,
  MobilePhoneSaveOut_SC,
  MobilePhoneModifyIn_SC,
  MobilePhoneDelIn_SC
} from '../schemas/request/mobile-phone';
import {
  mobilePhoneService as mpService,
  IMobilePhoneService
} from '../service/mobile-phone';

import {
  parameter,
  get,
  post,
  del,
  controller,
  summary,
  response,
  tag,
  ENUM_PARAM_IN
} from 'koa-joi-swagger-ts';
import * as joi from 'joi';
import { array, string } from 'joi';

@controller('/api/mobile-phone')
export class MobilePhoneController {
  constructor() {
    console.log('MobilePhoneController初始化');
    // this.mpService = mobilePhoneService;
  }

  // private mpService: IMobilePhoneService;

  /**
   * id查找
   */
  @get('/findone')
  @tag('MobilePhone')
  @parameter(
    '_id',
    joi.string().required().description('id'),
    ENUM_PARAM_IN.query
  )
  // @response(200, { type: 'object', items: { $ref: MobilePhoneQuery_SC } })
  async findOne(ctx: Koa.BaseContext, next: Koa.Next) {
    console.log('controller : ' + JSON.stringify(ctx.query._id));
    ctx.body = await mpService.findOne({ _id: ctx.query._id });
  }

  /**
   * 查找
   */
  @get('/findAll')
  @tag('MobilePhone')
  @parameter(
    'model_name',
    joi.string().description('手机型号'),
    ENUM_PARAM_IN.query
  )
  @parameter('_id', joi.string().description('id'), ENUM_PARAM_IN.query)
  // @response(200, { type: 'array', items: { $ref: MobilePhoneQuery_SC } })
  async findAll(ctx: Koa.BaseContext, next: Koa.Next) {
    ctx.body = await mpService.findAll({
      _id: ctx.query._id,
      model_name: ctx.query.model_name
    });
  }

  /**
   * 添加手机
   */
  @post('/save')
  @tag('MobilePhone')
  @parameter('MobilePhone', { $ref: MobilePhoneSaveIn_SC }, ENUM_PARAM_IN.body)
  //   @response(200, {
  //     type: 'object',
  //     items: { $ref: MobilePhoneSaveOut_SC }
  //   })
  async save(ctx: Koa.BaseContext) {
    console.log('controller ctx : ' + JSON.stringify(ctx));
    console.log('controller : ' + JSON.stringify(ctx.body));

    const newMobiles = new MobilePhoneSaveIn();
    newMobiles.model_name = ctx.body.model_name;
    newMobiles.size = ctx.body.size;
    newMobiles.spec = ctx.body.spec;
    newMobiles.ram = ctx.body.ram;
    newMobiles.rom = ctx.body.rom;
    newMobiles.seria_number = ctx.body.seria_number;

    ctx.body = await mpService.save(newMobiles);
  }

  /**
   * 更新手机
   */
  async update(ctx: Koa.BaseContext, next: Koa.Next) {
    console.log('controller : ' + JSON.stringify(ctx.body));

    const newMobiles = new MobilePhoneModifyIn();
    newMobiles._id = ctx.body._id;
    newMobiles.model_name = ctx.body.model_name;
    newMobiles.size = ctx.body.size;
    newMobiles.spec = ctx.body.spec;
    newMobiles.ram = ctx.body.ram;
    newMobiles.rom = ctx.body.rom;
    newMobiles.seria_number = ctx.body.seria_number;

    ctx.body = await mpService.update(_.toString(newMobiles._id), newMobiles);
  }

  /**
   * 删除手机
   */
  async delete(ctx: Koa.BaseContext, next: Koa.Next) {
    console.log('controller : ' + JSON.stringify(ctx.query._id));

    const delMobile = new MobilePhoneDelIn();
    // delMobile._id = ctx.body._id;
    delMobile._id = _.toString(ctx.query._id);

    ctx.body = await mpService.delete(delMobile);
  }
}

export const MobilePhone = new MobilePhoneController();
