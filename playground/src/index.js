import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import setUp from './App/setUp';
import user from './App/models/user';
import system from './App/models/system';

const render = (store) => (App) => {
	ReactDOM.render(<App />, document.getElementById('root'));
	serviceWorker.unregister(); // Learn more about service workers: https://bit.ly/CRA-PWA
};

const { dispatch } = setUp(
	{
		models: [ user, system ],
		persistOptions: {
			whitelist: [ user.namespace ],
			blacklist: [ system.namespace ],
			callback: (store) => () => {
				store.dispatch({
					type: `${system.namespace}/setReduxPersistRecover`,
					payload: true
				});
				console.log('TCL: persistStore callback', store.getState());
			}
		}
	},
	render
);

setTimeout(() => {
	dispatch({
		type: 'user/setUser',
		payload: {
			auth: {
				world: 'yes!'
			}
		}
	});
}, 1000);
