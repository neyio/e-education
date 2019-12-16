import React from 'react';
import { connect, router } from 'dva';
import { pick } from 'ramda';
import CoreContainerLayout from '../layouts/CoreContainer/index';
import RBACRouter, { ROUTES as RBAC_ROUTES } from './rbac';
import { PrivateRoute } from './helpers';
import Example from '../pages/Test';

// import Test from '@education/test';
// <Route path="/test" component={Test(app)} />
const AuthedRouteContainer = PrivateRoute();
const { Router, Route } = router;

function Entrance(props) {
	const { history, user } = props; // app, <Route path="/test" component={Test(app)} />
	const { auth } = user; // auth looks like=> {isAuthenticated & tokens}
	const { isAuthenticated } = auth;
	console.warn('TCL: Entrance -> isAuthenticated', isAuthenticated);
	const authExcludedRoutes = Object.values(
		pick([ RBAC_ROUTES.LOGIN, RBAC_ROUTES.LOGOUT, RBAC_ROUTES.RESET_PASSWORD ], RBAC_ROUTES)
	);
	return (
		<Router history={history}>
			<CoreContainerLayout authOptions={{ excludedRoutes: authExcludedRoutes }}>
				{isAuthenticated ? (
					<AuthedRouteContainer path="/" auth={auth}>
						<Route path="/" exact component={Example} />
						<RBACRouter routes={RBAC_ROUTES} excluded={{ [RBAC_ROUTES.login]: true }} />
					</AuthedRouteContainer>
				) : (
					<RBACRouter
						routes={pick(
							[ RBAC_ROUTES.LOGIN, RBAC_ROUTES.LOGOUT, RBAC_ROUTES.RESET_PASSWORD ],
							RBAC_ROUTES
						)}
					/>
				)}
			</CoreContainerLayout>
		</Router>
	);
}
export default connect(({ user }) => {
	return { user };
})(Entrance);
