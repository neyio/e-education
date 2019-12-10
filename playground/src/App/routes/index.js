import React from 'react';
import { connect, router } from 'dva';
import RBACRouter, { routes as RBACRoutes, Login } from './rbac';
import BaseLayout from '../layouts/Base';
import { PrivateRoute } from './helpers';
import Example from '../pages/Test';

// import Test from '@education/test';
// <Route path="/test" component={Test(app)} />
const AuthedRouteContainer = PrivateRoute();
const { Router, Route, Redirect } = router;

function Entrance(props) {
	const { history, app, user } = props;
	console.log('TCL: Entrance -> app', app);
	console.log('TCL: Entrance -> history', history);
	console.log('TCL: Entrance -> user', user);
	const { auth } = user;
	const { isAuthenticated } = auth;
	console.log('TCL: Entrance -> isAuthenticated', isAuthenticated);
	return (
		<Router history={history}>
			<BaseLayout>
				{isAuthenticated ? (
					<AuthedRouteContainer path="/" auth={auth}>
						<Route path="/" exact component={Example} />
						<RBACRouter routes={RBACRoutes} excluded={{ [RBACRoutes.login]: true }} />
					</AuthedRouteContainer>
				) : (
					<Redirect to={{ pathname: RBACRoutes.login }} />
				)}
				<Route path={RBACRoutes.login} component={Login} />
			</BaseLayout>
		</Router>
	);
}
export default connect(({ user }) => {
	return { user };
})(Entrance);
