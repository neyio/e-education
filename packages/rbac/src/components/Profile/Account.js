import React from 'react';
import { connect } from 'dva';
const Account = ({ children }) => {
	return <div>this is account {children}</div>;
};
export default connect(({ request }) => {
	return { restfulApiRequest: request.restfulApiRequest };
})(Account);
