import React, { useEffect } from 'react';
import { connect } from 'dva';
const Example = (props) => {
	useEffect(
		() => {
			console.log('request', props.user);

			return () => {
				console.log('clean');
			};
		},
		[ props ]
	);

	return <div>hello world{props.user.info.baba}</div>;
};
export default connect(({ user }) => {
	return { user };
})(Example);
