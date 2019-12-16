import React from 'react';
import { router, connect } from 'dva';

const { Redirect } = router;

const Logout = props => {
  props.logout();
  return <Redirect to="/login" />;
};
export default connect(
  () => {
    return {};
  },
  dispatch => {
    return {
      logout() {
        dispatch({ type: 'user/logout' });
      },
    };
  },
)(Logout);
