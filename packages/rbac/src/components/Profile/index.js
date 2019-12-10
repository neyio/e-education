import React from 'react';
import { router } from 'dva';
const Profile = (props) => {
	const { children } = props;
	return (
		<div>
			Profile
			<aside>aside</aside>
			<section>{children}</section>
		</div>
	);
};
export default Profile;
