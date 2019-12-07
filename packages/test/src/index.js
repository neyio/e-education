import { router, connect, dynamic } from 'dva';
import React from 'react';
import model from './model';
import main from './main';
const { Route, Switch, useRouteMatch, Link } = router;

const Test = (app) => {
	const Main = dynamic({
		app,
		models: () => [ model ],
		component: () => main
	});
	const render = (props) => {
		console.log('test props=>', props.user);
		const { path } = useRouteMatch();
		return (
			<React.Fragment>
				<Link to={`${path}/t`}> this is test </Link>
				<Switch>
					<Route path={`${path}/t`}>
						<Link to={`${path}/t/happy`}>real happy? </Link>
						<Link to={`${path}/t/nohappy`}>no happy? </Link>
						<Switch>
							<Main />
						</Switch>
					</Route>
				</Switch>
			</React.Fragment>
		);
	};

	return connect((state) => {
		return { user: state.user };
	})(render);
};

export default Test;
