import React, { useEffect } from 'react';
import { connect } from 'dva';
const Example = (props) => {
	useEffect(
		() => {
			return () => {};
		},
		[ props ]
	);

	return <div>hello world {props.user.auth.isAuthenticated ? 'online' : 'offline'}</div>;
};
export default connect(({ user }) => {
	return { user };
})(Example);
