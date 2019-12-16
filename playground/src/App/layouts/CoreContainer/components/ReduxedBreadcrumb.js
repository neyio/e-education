import React from 'react';
import { connect, router } from 'dva';
import { Breadcrumb } from 'antd';
const { Link } = router;

function itemRender(route, _, routes, paths) {
	const last = routes.indexOf(route) === routes.length - 1;
	return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
}

const ReduxedBreadCrumb = ({ routes = [] }) => {
	return <Breadcrumb itemRender={itemRender} routes={routes} />;
};

export default connect(({ layout }) => {
	return {
		routes: layout.breadcrumb
	};
})(ReduxedBreadCrumb);
