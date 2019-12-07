import React from 'react';
import { router } from 'dva';

const { Route, Switch, useRouteMatch, Link } = router;
const Happy = (props) => {
	return <div>happy 12.07</div>;
};
const NoHappy = (props) => {
	return <div>not happy now </div>;
};
const Main = (props) => {
	const { path } = useRouteMatch();
	return (
		<React.Fragment>
			<Route path={`${path}/happy`} component={Happy} />
			<Route path={`${path}/nohappy`} component={NoHappy} />
		</React.Fragment>
	);
};
export default Main;
