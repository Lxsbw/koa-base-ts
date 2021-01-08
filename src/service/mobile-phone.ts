/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-26 15:07:47
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-08 21:57:12
 */

import { IMobilePhoneDoc, factory } from '../models/mobile-phone';
import { BaseService } from '../base/base.service.mongo';
import { Model } from 'mongoose';
import * as _ from 'lodash';
import {
  MobilePhoneQuery,
  MobilePhoneSaveIn,
  MobilePhoneSaveOut,
  MobilePhoneModifyIn,
  MobilePhoneDelIn
} from '../schemas/request/mobile-phone';

export interface IMobilePhoneService extends MobilePhoneService {}

export class MobilePhoneService extends BaseService {
  constructor() {
    console.log('MobilePhoneService初始化');
    super();
    this.MobilePhoneDoc = factory();
  }

  private MobilePhoneDoc: Model<IMobilePhoneDoc>;

  /**
   * 查找
   */
  async findAll(param: any): Promise<MobilePhoneQuery> {
    console.log('Service param : ' + JSON.stringify(param));
    let conditions = {};
    if (param._id) {
      conditions = { ...conditions, _id: param._id };
    }
    if (param.model_name) {
      conditions = { ...conditions, model_name: param.model_name };
    }
    return this.MobilePhoneDoc.find(conditions).exec();
  }

  /**
   * 查找一个
   */
  async findOne(param: any): Promise<any> {
    return this.MobilePhoneDoc.findOne({ _id: param._id })
      .exec()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return { state: 'Fail', mess: err };
      });
  }

  /**
   * 添加手机
   */
  async save(param: MobilePhoneSaveIn): Promise<MobilePhoneSaveOut> {
    return this.upset(this.MobilePhoneDoc, param).then((result) => {
      return { _id: _.get(result, '_id', param._id) };
    });
  }

  /**
   * 更新
   */
  async update(_id: string, param: MobilePhoneModifyIn): Promise<any> {
    let conditions = {};

    if (param.model_name) {
      conditions = { ...conditions, model_name: param.model_name };
    }
    if (param.size) {
      conditions = { ...conditions, size: param.size };
    }
    if (param.spec) {
      conditions = { ...conditions, spec: param.spec };
    }
    if (param.ram) {
      conditions = { ...conditions, ram: param.ram };
    }
    if (param.rom) {
      conditions = { ...conditions, rom: param.rom };
    }
    if (param.seria_number) {
      conditions = { ...conditions, seria_number: param.seria_number };
    }

    return this.MobilePhoneDoc.updateOne({ _id }, conditions)
      .then((data) => {
        return { ...data, state: 'Success' };
      })
      .catch((err) => {
        return { state: 'Fail', mess: err };
      });
  }

  /**
   * 删除
   */
  async delete(param: MobilePhoneDelIn): Promise<any> {
    return this.MobilePhoneDoc.deleteOne(param)
      .then((data) => {
        return { ...data, state: 'Success' };
      })
      .catch((err) => {
        return { state: 'Fail', mess: err };
      });
  }
}

export const mobilePhoneService = new MobilePhoneService();
