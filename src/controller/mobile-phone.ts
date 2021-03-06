/*
 * @Author: zhixiong.fu
 * @Date: 2021-01-08 21:42:05
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-10 16:29:40
 */

import { Context, Next } from 'koa';
import * as _ from 'lodash';
import {
  controller,
  get,
  post,
  put,
  del,
  tag,
  summary,
  description,
  parameter,
  response,
  ENUM_PARAM_IN
} from '@lxsbw/koa-joi-swagger-ts';
import * as joi from 'joi';
// import { array, string, object } from 'joi';
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
import { mobilePhoneService as mpService } from '../service/mobile-phone';

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
  @summary('id查找')
  @description('id查找')
  @parameter(
    '_id',
    joi.string().required().description('id'),
    ENUM_PARAM_IN.query
  )
  // @response(200, { type: 'object', items: { $ref: MobilePhoneQuery_SC } })
  async findOne(ctx: Context, next: Next) {
    console.log('controller : ' + JSON.stringify(ctx.query._id));
    ctx.body = await mpService.findOne({ _id: ctx.query._id });
  }

  /**
   * 查找
   */
  @get('/findall')
  @tag('MobilePhone')
  @summary('查找')
  @description('查找')
  @parameter(
    'model_name',
    joi.string().description('手机型号'),
    ENUM_PARAM_IN.query
  )
  @parameter('_id', joi.string().description('id'), ENUM_PARAM_IN.query)
  // @response(200, { type: 'array', items: { $ref: MobilePhoneQuery_SC } })
  async findAll(ctx: Context, next: Next) {
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
  @summary('添加手机')
  @description('添加手机')
  @parameter(
    'MobilePhone',
    { type: 'object', required: true, items: { $ref: MobilePhoneSaveIn_SC } },
    ENUM_PARAM_IN.body
  )
  async save(ctx: Context, next: Next) {
    console.log('controller : ' + JSON.stringify(ctx.request.body));

    const newMobiles = new MobilePhoneSaveIn();
    newMobiles.model_name = ctx.request.body.model_name;
    newMobiles.size = ctx.request.body.size;
    newMobiles.spec = ctx.request.body.spec;
    newMobiles.ram = ctx.request.body.ram;
    newMobiles.rom = ctx.request.body.rom;
    newMobiles.seria_number = ctx.request.body.seria_number;

    ctx.body = await mpService.save(newMobiles);
  }

  /**
   * 更新手机
   */
  @put('/update')
  @tag('MobilePhone')
  @summary('更新手机')
  @description('更新手机')
  @parameter(
    'MobilePhoneUpd',
    { type: 'object', required: true, items: { $ref: MobilePhoneModifyIn_SC } },
    ENUM_PARAM_IN.body
  )
  async update(ctx: Context, next: Next) {
    console.log('controller : ' + JSON.stringify(ctx.request.body));

    const newMobiles = new MobilePhoneModifyIn();
    newMobiles._id = ctx.request.body._id;
    newMobiles.model_name = ctx.request.body.model_name;
    newMobiles.size = ctx.request.body.size;
    newMobiles.spec = ctx.request.body.spec;
    newMobiles.ram = ctx.request.body.ram;
    newMobiles.rom = ctx.request.body.rom;
    newMobiles.seria_number = ctx.request.body.seria_number;

    ctx.body = await mpService.update(_.toString(newMobiles._id), newMobiles);
  }

  /**
   * 删除手机
   */
  @del('/delete')
  @tag('MobilePhone')
  @summary('删除手机')
  @description('删除手机')
  @parameter(
    'MobilePhoneDel',
    { type: 'object', required: true, items: { $ref: MobilePhoneDelIn_SC } },
    ENUM_PARAM_IN.body
  )
  async delete(ctx: Context, next: Next) {
    console.log('controller : ' + JSON.stringify(ctx.request.body));

    const delMobile = new MobilePhoneDelIn();
    delMobile._id = _.toString(ctx.request.body._id);

    ctx.body = await mpService.delete(delMobile);
  }
}

export const MobilePhone = new MobilePhoneController();
