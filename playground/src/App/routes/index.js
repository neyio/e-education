import React from 'react';
import { connect, router } from 'dva';
import RBACRouter, { routes as RBACRoutes, Login } from './rbac';
import CoreContainerLayout from '../layouts/CoreContainer/index';
import { PrivateRoute } from './helpers';
import Example from '../pages/Test';

// import Test from '@education/test';
// <Route path="/test" component={Test(app)} />
const AuthedRouteContainer = PrivateRoute();
const { Router, Route, Redirect } = router;

function Entrance(props) {
	const { history, user } = props; // app, <Route path="/test" component={Test(app)} />
	const { auth } = user;
	const { isAuthenticated } = auth;
	console.warn('TCL: Entrance -> isAuthenticated', isAuthenticated);
	return (
		<Router history={history}>
			<CoreContainerLayout>
				{isAuthenticated ? (
					<AuthedRouteContainer path="/" auth={auth}>
						<Route path="/" exact component={Example} />
						<RBACRouter routes={RBACRoutes} excluded={{ [RBACRoutes.login]: true }} />
					</AuthedRouteContainer>
				) : (
					<Redirect to={{ pathname: RBACRoutes.login }} />
				)}
				<Route path={RBACRoutes.login} component={Login} />
			</CoreContainerLayout>
		</Router>
	);
}
export default connect(({ user }) => {
	return { user };
})(Entrance);
