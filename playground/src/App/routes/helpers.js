import React from 'react';
import { router } from 'dva';
const { Route, Redirect } = router;

export const PrivateRoute = (redirectUrl = '/login') => ({ auth, children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.isAuthenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: redirectUrl,
							state: { from: location }
						}}
					/>
				)}
		/>
	);
};
