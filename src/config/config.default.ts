/*
 * @Author: zhixiong.fu
 * @Date: 2021-01-08 20:32:36
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2021-01-08 21:16:47
 */

interface ISystemConfig {
  host: string;
  port: number;
}

export const sysConfig: ISystemConfig = {
  host: 'localhost',
  port: 9001
};

const mongoConf = {
  user: 'test_user',
  pass: '123456',
  host: '121.37.188.31',
  port: '16380',
  db: 'testdb'
};

export const getMongoUrl = () => {
  let mongoUrl = 'mongodb://';
  let dbName = mongoConf.db;
  mongoUrl += `${mongoConf.user}:${mongoConf.pass}@${mongoConf.host}:${mongoConf.port}`;
  mongoUrl += `/${dbName}`;

  return mongoUrl;
};
