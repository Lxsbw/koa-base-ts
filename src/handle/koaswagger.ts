/*
 * @Author: zhixiong.fu
 * @Date: 2021-01-09 14:00:02
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-09 14:09:27
 */

import { KJSRouter } from 'koa-joi-swagger-ts';
import { MobilePhoneController } from '../controller/mobile-phone';

/**
 * 映射controller，为swagger api doc准备
 */
export const ControllerMap = (router: KJSRouter): void => {
  //   router.loadDefinition(UserSchema);
  //   router.loadDefinition(AdminSchema);
  // Or you can:
  // router.loadDefinition([UserSchema, AdminSchema]);
  //   router.loadController(BaseController);
  // Process controller through pattern Decorator
  router.loadController(MobilePhoneController /*, baseControllerFunction*/);
  //   router.loadController(AdminController);
};
