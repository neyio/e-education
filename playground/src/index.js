import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import setUp from './App/setUp';
import user, { NAMESPACE as UserNamespace } from './App/models/user';
import system, { ACTIONS as SystemActions, NAMESPACE as SystemNamespace } from './App/models/system';
import request from './App/models/request';
import configuare from './App/models/config';

const render = (store) => (App) => {
	ReactDOM.render(<App />, document.getElementById('root'));
	serviceWorker.unregister(); // Learn more about service workers: https://bit.ly/CRA-PWA
};

const { dispatch } = setUp(
	{
		models: configuare(user, system, request),
		persistOptions: {
			whitelist: [ UserNamespace ],
			blacklist: [ SystemNamespace ],
			callback: (store) => () => {
				store.dispatch({
					type: `${SystemNamespace}/${SystemActions.SET_REDUX_PERSIST_RECOVER}`,
					payload: true
				});
				console.groupCollapsed('PERSIST CALLBACK');
				console.log('TCL: persistStore callback', store.getState());
				console.groupEnd('PERSIST CALLBACK');
			}
		}
	},
	render
);
// 使用 宏观队列，防止超车，导致执行无效，最后被 redux-persist 的恢复覆盖
setTimeout(() => {
	dispatch({
		type: 'user/login',
		payload: {
			isAuthenticated: false,
			tokens: {
				refreshToken: 1,
				accessToken: 2
			}
		}
	});
});
