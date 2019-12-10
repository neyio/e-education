import React from 'react';
import { router } from 'dva';
const { Switch } = router;
import RouteWithSubRoutes from '../RouteWithSubRoutes';
const Profile = (props) => {
	const { children } = props;
	return (
		<div>
			Profile
			<aside>aside</aside>
			<section>
				{children}
				{/* <Switch>{props.routes&&props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}</Switch> */}
			</section>
		</div>
	);
};
export default Profile;
