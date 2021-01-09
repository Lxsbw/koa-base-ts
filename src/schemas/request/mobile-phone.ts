/*
 * @Author: zhixiong.fu
 * @Date: 2021-01-08 21:40:49
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-08 21:56:01
 */
import {
  definition,
  summary,
  response,
  tag,
  ENUM_PARAM_IN
} from 'koa-joi-swagger-ts';
import * as joi from 'joi';
import { array, string } from 'joi';

// 手机参数(查询结果)
export class MobilePhoneQuery {
  public _id?: string;
  public model_name?: string;
  public size?: string;
  public spec?: string;
  public ram?: number;
  public rom?: number;
  public seria_number?: string;
  [k: string]: any;
}
@definition('MobilePhoneQuery', '手机参数(查询结果)')
export class MobilePhoneQuery_SC {
  // _id = joi.string().description('id');
  model_name = joi.string().description('手机型号');
  size = joi.string().description('尺寸');
  spec = joi.string().description('规格');
  ram = joi.number().description('内存');
  rom = joi.number().description('空间');
  seria_number = joi.string().description('序列号');
}

// 创建手机-输入参数'
export class MobilePhoneSaveIn {
  public _id?: string;
  public model_name?: string;
  public size?: string;
  public spec?: string;
  public ram?: number;
  public rom?: number;
  public seria_number?: string;
}
@definition('MobilePhoneSaveIn', '创建手机-输入参数')
export class MobilePhoneSaveIn_SC {
  model_name = joi.string().required().description('手机型号');
  size = joi.string().required().description('尺寸');
  spec = joi.string().required().description('规格');
  ram = joi.number().description('内存');
  rom = joi.number().description('空间');
  seria_number = joi.string().description('序列号');
}

// 创建手机-输出参数
export class MobilePhoneSaveOut {
  public _id?: string;
  [k: string]: any;
}
@definition('MobilePhoneSaveOut', '创建手机-输出参数')
export class MobilePhoneSaveOut_SC {
  _id = joi.string().description('id');
}

// 修改手机-输入参数
export class MobilePhoneModifyIn {
  public _id?: string;
  public model_name?: string;
  public size?: string;
  public spec?: string;
  public ram?: number;
  public rom?: number;
  public seria_number?: string;

  [k: string]: any;
}
@definition('MobilePhoneModifyIn', '修改手机-输入参数')
export class MobilePhoneModifyIn_SC {
  _id = joi.string().required().description('id');
  model_name = joi.string().max(30).min(1).required().description('手机型号');
  size = joi.string().description('尺寸');
  spec = joi.string().description('规格');
  ram = joi.number().description('内存');
  rom = joi.number().description('空间');
  seria_number = joi.string().description('序列号');
}

// 删除手机-输入参数
export class MobilePhoneDelIn {
  public _id?: string;
}
@definition('MobilePhoneDelIn', '删除手机-输入参数')
export class MobilePhoneDelIn_SC {
  _id = joi.string().required().description('id');
}
