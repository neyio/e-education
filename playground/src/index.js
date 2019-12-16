import React from 'react';
import ReactDOM from 'react-dom';
import CoreModels from '@education/core-models';
import * as serviceWorker from './serviceWorker';
import setUp from './App/setUp';
import apis from './App/api/index';
import './App/less/index.less';

import configuare from './App/models/config';
const { User, System, Layout, Request } = CoreModels;

const { ACTIONS: SystemActions, NAMESPACE: SystemNamespace } = System;

const { NAMESPACE: UserNamespace } = User;
const { NAMESPACE: LayoutNamespace } = Layout;
const { NAMESPACE: RequestNamespace } = Request;

const render = (store) => (App) => {
	ReactDOM.render(<App />, document.getElementById('root'));
	serviceWorker.unregister(); // Learn more about service workers: https://bit.ly/CRA-PWA
};

const { dispatch } = setUp(
	{
		models: configuare([ UserNamespace, SystemNamespace, RequestNamespace, LayoutNamespace ])(
			User.default(),
			System.default(),
			Request.default({ initialApis: apis }),
			Layout.default()
		),
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
			isAuthenticated: true,
			tokens: {
				refreshToken: 1,
				accessToken: 2
			}
		}
	});
});
