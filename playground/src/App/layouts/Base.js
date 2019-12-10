import React, { useEffect } from 'react';
import urlParse from 'url-parse';
import { connect, router } from 'dva';
const { useHistory } = router;

const compareUrl = (a, b) => {
	return a === b;
};
function BaseLayout({ children, user }) {
	const history = useHistory();
	useEffect(
		() => {
			const onHashChange = (event) => {
				const { newURL, oldURL } = event;
				console.log('TCL: BaseLayout -> onHashChange -> newURL, oldURL', newURL, oldURL);
				if (compareUrl(newURL, oldURL)) {
					event.preventDefault();
					event.stopPropagation();
				}
				if (!user.auth.isAuthenticated) {
					if (urlParse(newURL).hash !== '/login') return history.push('/login');
					else {
						event.preventDefault();
						event.stopPropagation();
					}
				}
			};
			window.addEventListener('hashchange', onHashChange);
			return () => {
				console.log('BaseLayout rerender');
				window.removeEventListener('hashchange', onHashChange);
			};
		},
		[ history, user ]
	);
	return (
		<React.Fragment>
			<h1>JUST BASELAYOUT</h1>
			{children}
		</React.Fragment>
	);
}
export default connect(({ user }) => ({ user }))(BaseLayout);
