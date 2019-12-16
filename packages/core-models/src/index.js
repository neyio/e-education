import * as user from './models/user';
import * as request from './models/request';
import * as system from './models/system';
import * as layout from './models/layout';

export const Layout = layout;
export const System = system;
export const Request = request;
export const User = user;

export default {
  User,
  Request,
  System,
  Layout,
};
