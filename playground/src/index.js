import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import setUp from './App/setUp';
import user from './App/models/user';
import system from './App/models/system';
import request from './App/models/request';

const render = (store) => (App) => {
	ReactDOM.render(<App />, document.getElementById('root'));
	serviceWorker.unregister(); // Learn more about service workers: https://bit.ly/CRA-PWA
};

const { dispatch } = setUp(
	{
		models: [ user, system, request ],
		persistOptions: {
			whitelist: [ user.namespace ],
			blacklist: [ system.namespace ],
			callback: (store) => () => {
				store.dispatch({
					type: `${system.namespace}/setReduxPersistRecover`,
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
