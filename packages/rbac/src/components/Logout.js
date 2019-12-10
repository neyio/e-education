import React from 'react';
import { router, connect } from 'dva';
const { Redirect } = router;

const Logout = () => {
	return <Redirect to="/login" />;
};
export default connect(() => {
	return {};
})(Logout);
