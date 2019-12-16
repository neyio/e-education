import React from 'react';
import { router } from 'dva';
import RouteWithSubroutes from '@education/route-with-subroutes';
import Login from './components/Login';
import Logout from './components/Logout';
import ResetPassword from './components/RestPassword';
import Register from './components/Register';
import Profile from './components/Profile';
import Account from './components/Profile/account';
import Base from './components/Profile/Base';
import { ROUTES } from './constants/index';

const { Switch } = router;
const exceptExcludedRoutes = input => {
  if (Array.isArray(input)) {
    return input.reduce((acc, currentItem) => {
      return currentItem.excluded && currentItem.path
        ? acc
        : acc.concat(
            currentItem.routes
              ? {
                  ...currentItem,
                  routes: exceptExcludedRoutes(currentItem.routes),
                }
              : currentItem,
          );
    }, []);
  }
  return input;
};

const routesMixins = (options = ROUTES) => {
  const { EXCLUDED = {} } = options;
  return exceptExcludedRoutes([
    {
      path: options.LOGIN,
      component: Login,
      excluded: EXCLUDED.LOGIN || EXCLUDED[options.LOGIN],
    },
    {
      path: options.LOGOUT,
      component: Logout,
      excluded: EXCLUDED.LOGOUT || EXCLUDED[options.LOGOUT],
    },
    {
      path: options.RESET_PASSWORD,
      component: ResetPassword,
      excluded: EXCLUDED.RESET_PASSWORD || EXCLUDED[options.RESET_PASSWORD],
    },
    {
      path: options.REGISTER,
      component: Register,
      excluded: EXCLUDED.REGISTER || EXCLUDED[options.REGISTER],
    },
    {
      path: options.PROFILE,
      component: Profile,
      excluded: EXCLUDED.PROFILE || EXCLUDED[options.PROFILE],
      routes: [
        {
          path: options.BASE,
          component: Base,
          exact: true,
          excluded: EXCLUDED.BASE || EXCLUDED[options.BASE],
        },
        {
          path: options.ACCOUNT,
          component: Account,
          excluded: EXCLUDED.ACCOUNT || EXCLUDED[options.ACCOUNT],
          routes: [
            {
              path: options.ACCOUNT,
              exact: true,
              component: () => {
                return <div>account content</div>;
              },
            },
            {
              path: '/profile/account/happy',
              component: () => {
                return <div>/profile/account/happy</div>;
              },
            },
          ],
        },
      ],
    },
  ]);
};

const RbacContainer = ({ routes }) => {
  return (
    <React.Fragment>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubroutes key={i} {...route} />
        ))}
      </Switch>
    </React.Fragment>
  );
};

/**
 *
 * RbacContainer mixin的路由
 * @export
 * @param {*} props
 *  {
 *    login = '/login',
 *    resetPassword = '/reset-password',
 *    register = '/register',
 *    profile = '/profile',
 *    base = '/',
 *    account = '/account'
 *}
 * @returns Mixined routes
 */

export default function({ routes, excluded }) {
  const generateRoutes = routesMixins({ ...routes, excluded });
  console.groupCollapsed('RbacContainer ROUTES');
  console.log('TCL: generateRoutes===>', generateRoutes);
  console.groupEnd('RbacContainer ROUTES');
  return <RbacContainer routes={generateRoutes} />;
}
