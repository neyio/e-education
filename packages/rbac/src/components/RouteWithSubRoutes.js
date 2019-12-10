import React from 'react';
import { router } from 'dva';
const { Route, Switch } = router;

export default function RouteWithSubRoutes(route) {
	const { routes } = route;
	if (Array.isArray(routes)) {
		return (
			<Route
				path={route.path}
				render={(props) => {
					return (
						<route.component {...props} routes={routes}>
							<Switch>
								{routes.map((subRoute, i) => (
									<RouteWithSubRoutes key={i} {...subRoute} routes={subRoute.routes} />
								))}
							</Switch>
						</route.component>
					);
				}}
			/>
		);
	}

	return <Route path={route.path} render={(props) => <route.component {...props} routes={route.routes} />} />;
}
