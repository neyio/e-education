import RBACRouter, { routes } from './routes';
import Login from './components/Login';
import ResetPassword from './components/RestPassword';
import Register from './components/Register';
import Profile from './components/Profile/index';
import Base from './components/Profile/Base';
import Account from './components/Profile/Account';

const needImplementApi = {
	rbac: [ 'login', 'profile', 'profile.account' ]
};

export { needImplementApi, Login, ResetPassword, Register, Profile, Base, Account, routes, RBACRouter as default };
