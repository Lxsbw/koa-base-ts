/*
 * @Author: zhixiong.fu
 * @Date: 2021-01-08 21:40:49
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-08 21:56:01
 */

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

// 创建手机-输出参数
export class MobilePhoneSaveOut {
  public _id?: string;

  [k: string]: any;
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

// 删除手机-输入参数
export class MobilePhoneDelIn {
  public _id?: string;
}
