/*
 * @Author: zhixiong.fu
 * @Date: 2021-01-08 21:51:52
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-08 21:53:30
 */

import {
  Model,
  Document,
  SaveOptions,
  ModelUpdateOptions,
  Types
} from 'mongoose';
import * as _ from 'lodash';

export class BaseService {
  get ObjectId() {
    return _.toString(Types.ObjectId());
  }

  async upset<T extends Document>(
    doc: Model<T>,
    param: any,
    options?: SaveOptions | ModelUpdateOptions
  ): Promise<any> {
    // TODO: 后面完善
    // if (new Date() > new Date('2020-12-30')) {
    //   return this.cthrow(500, 'date error must link lp');
    // }
    if (!param._id) {
      param.createdUser = this.auth.id;
    } else {
      param.updatedUser = this.auth.id;
    }
    const data = await (!param._id
      ? doc.create(param /*, options*/)
      : doc.update({ _id: param._id }, param, options as ModelUpdateOptions));
    if (param._id) {
      await doc
        .findOne({
          _id: param._id
        })
        .then((result: any) => {
          result.save();
        });
    }
    return data;
  }

  async findAndCount<T extends Document>(
    doc: Model<T>,
    conditions: any,
    offest: number,
    limit = 10,
    sort = '_id',
    sortDesc?: boolean,
    projection?: any,
    options?: any
  ) {
    if (
      this.auth.userName !== 'admin' &&
      !_.get(this.auth, 'role.directorCheckbox')
    ) {
      conditions = {
        ...conditions,
        createdUser: this.auth.id
      };
    }
    // console.log(conditions);
    return Promise.all([
      doc.find(conditions, options).countDocuments().exec(),
      doc
        .find(conditions, projection, options)
        .sort({ [sort]: sortDesc ? '1' : '-1' })
        .skip(offest)
        .limit(_.toNumber(limit) > 0 ? _.toNumber(limit) : 0)
        .exec()
    ]).then((resultall) => {
      return {
        total: resultall[0],
        row: resultall[1]
      };
    });
  }

  async findAndCountParam<T extends Document>(param: {
    doc: Model<T>;
    conditions: any;
    offest: number;
    limit: number;
    sort?: '_id';
    sortDesc?: boolean;
    projection?: any;
    options?: any;
    populate?: any;
  }) {
    if (
      this.auth.userName !== 'admin' &&
      !_.get(this.auth, 'role.directorCheckbox')
    ) {
      param.conditions = {
        ...param.conditions,
        createdUser: this.auth.id
      };
    }
    return Promise.all([
      param.doc.find(param.conditions, param.options).countDocuments().exec(),
      param.doc
        .find(param.conditions, param.projection, param.options)
        // .sort({ [param.sort]: param.sortDesc ? '1' : '-1' })
        .skip(param.offest)
        .limit(_.toNumber(param.limit) > 0 ? _.toNumber(param.limit) : 0)
        .populate(param.populate)
        .exec()
    ]).then((resultall) => {
      return {
        total: resultall[0],
        row: resultall[1]
      };
    });
  }

  // TODO: 临时处理
  auth = {
    id: '1118764157307453440',
    userName: 'test',
    code: '',
    onTime: new Date(),
    rovider: 'wx',
    i18n: 'zh-cn'
  };
}
