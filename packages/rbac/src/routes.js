import React from 'react';
import { router } from 'dva';
import RouteWithSubroutes from '@education/route-with-subroutes';
import Login from './components/Login';
import ResetPassword from './components/RestPassword';
import Register from './components/Register';
import Profile from './components/Profile';
import Account from './components/Profile/account';
import Base from './components/Profile/Base';
const { Route, Switch } = router;

export const routes = {
	login: '/login',
	resetPassword: '/reset-password',
	register: '/register',
	profile: '/profile',
	base: '/profile/',
	account: '/profile/account',
	excluded: {}
};

const exceptExcludedRoutes = (input) => {
	if (Array.isArray(input)) {
		return input.reduce((acc, currentItem) => {
			return currentItem.excluded
				? acc
				: acc.concat(
						currentItem.routes
							? {
									...currentItem,
									routes: exceptExcludedRoutes(currentItem.routes)
								}
							: currentItem
					);
		}, []);
	}
	return input;
};

const routesMixins = (options = routes) => {
	console.log('TCL: routesMixins -> options', options);
	const {
		login = '/login',
		resetPassword = '/reset-password',
		register = '/register',
		profile = '/profile',
		base = '/profile/',
		account = '/profile/account',
		excluded = {}
	} = options;
	return exceptExcludedRoutes([
		{
			path: login,
			component: Login,
			excluded: excluded.login || excluded[login]
		},
		{
			path: resetPassword,
			component: ResetPassword,
			excluded: excluded.resetPassword || excluded[resetPassword]
		},
		{
			path: register,
			component: Register,
			excluded: excluded.register || excluded[register]
		},
		{
			path: profile,
			component: Profile,
			excluded: excluded.profile || excluded[profile],
			routes: [
				{
					path: base,
					component: Base,
					exact: true,
					excluded: excluded.base || excluded[base]
				},
				{
					path: account,
					component: Account,
					routes: [
						{
							path: account,
							exact: true,
							component: Register
						},
						{
							path: '/profile/account/happy',
							component: ResetPassword
						}
					]
				}
			]
		}
	]);
};

const RBAC = ({ routes }) => {
	return (
		<React.Fragment>
			<Switch>{routes.map((route, i) => <RouteWithSubroutes key={i} {...route} />)}</Switch>
		</React.Fragment>
	);
};

/**
 *
 * RBAC mixin的路由
 * @export 
 * @param {*} props
 *  {
 *    login = '/login',
 *		resetPassword = '/reset-password',
 *		register = '/register',
 *		profile = '/profile',
 *		base = '/',
 *		account = '/account'
 *	}
 * @returns Mixined routes
 */
export default function({ routes, excluded }) {
	const generateRoutes = routesMixins({ ...routes, excluded });
	console.log('TCL: generateRoutes', generateRoutes);

	return <RBAC routes={generateRoutes} />;
}
