import React from 'react';
import dva, { router } from 'dva';
import createLoading from 'dva-loading';
import injectImmer from 'dva-immer';
import { message } from 'antd';
import { createLogger } from 'redux-logger';
import configure from './redux/config';
import Example from './pages/Test';
import Test from '@education/test';
const { Router, Route } = router;

let store = null;
let View = null;
let app = null;

export default function setUp(
	{
		plugins = [],
		models = [],
		persistOptions = {
			whitelist: [],
			blacklist: []
		},
		routes = []
	} = {},
	callback = () => {}
) {
	const { persistEnhancer, persistConfig, persistReducer } = configure({ ...persistOptions });
	app = dva({
		initialState: {},
		onAction: createLogger(),
		onError(e) {
			message.error(e.message, 3);
		},
		extraEnhancers: [ persistEnhancer() ],
		onReducer: (reducer) => persistReducer(persistConfig, reducer)
	});

	app.use(
		createLoading({
			global: true,
			models: {
				...models.reduce((pre, i) => {
					pre[i.namespace] = false;
					return pre;
				}, {})
			}
		})
	);
	app.use(injectImmer());
	// if (store && View) {
	// 	callback(View);
	// 	return { View, store, dispatch: store.dispatch, app };
	// }

	if (plugins && Array.isArray(plugins)) {
		plugins.forEach((plugin) => {
			app.use(plugin());
		});
	}

	models.forEach((model) => app.model(model));

	app.router(({ history }) => {
		return (
			<Router history={history}>
				<div>
					<h1>shit bar</h1>
					<Route path="/" component={Example} />
					<Route path="/test" component={Test(app)} />
				</div>
			</Router>
		);
	});
	View = app.start();
	store = app._store;

	setTimeout(() => callback(store)(View));
	return {
		View,
		store,
		dispatch: store.dispatch,
		app
	};
}
