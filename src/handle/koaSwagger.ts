/*
 * @Author: zhixiong.fu
 * @Date: 2021-01-09 14:00:02
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-09 14:09:27
 */

import { KoaSwaggerRouter } from '@lxsbw/koa-joi-swagger-ts';
import { MobilePhoneController } from '../controller/mobile-phone';
import {
  MobilePhoneQuery_SC,
  MobilePhoneSaveIn_SC,
  MobilePhoneSaveOut_SC,
  MobilePhoneModifyIn_SC,
  MobilePhoneDelIn_SC
} from '../schemas/request/mobile-phone';

/**
 * 映射controller，为swagger api doc准备
 */
export const ControllerMap = (router: KoaSwaggerRouter): void => {
  // 模型
  router.loadDefinition(MobilePhoneQuery_SC);
  router.loadDefinition([MobilePhoneSaveIn_SC, MobilePhoneSaveOut_SC]);
  router.loadDefinition(MobilePhoneModifyIn_SC);
  router.loadDefinition(MobilePhoneDelIn_SC);
  // Controller
  router.loadController(MobilePhoneController /*, baseControllerFunction*/);
};
