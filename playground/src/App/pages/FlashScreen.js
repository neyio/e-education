import React from 'react';
import { connect } from 'dva';
import system from '../models/system';
const FlashScreen = (props) => {
	const { isPersistRecover, children } = props;
	if (isPersistRecover) {
		return <React.Fragment>{children}</React.Fragment>;
	}
	return <div>havn't finish load</div>;
};

export default connect(({ [`${system.namespace}`]: { isPersistRecover } }) => {
	return { isPersistRecover };
})(FlashScreen);
