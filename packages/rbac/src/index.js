import RBACRouter from './routes';
import Login from './components/Login';
import ResetPassword from './components/RestPassword';
import Register from './components/Register';
import Profile from './components/Profile/index';
import Base from './components/Profile/Base';
import Account from './components/Profile/Account';
import { ROUTES } from './constants';

// 此处是要求用户自定义并实现的api
const needImplementApi = {
  rbac: {
    restful: false,
    post: {
      restful: true,
      comment: {
        restful: true,
      },
    },
    urls: {
      login: ['/login', 'post'],
      logout: ['/logout', 'post'],
    },
  },
};

export {
  needImplementApi,
  Login,
  ResetPassword,
  Register,
  Profile,
  Base,
  Account,
  ROUTES,
  RBACRouter as default,
};
