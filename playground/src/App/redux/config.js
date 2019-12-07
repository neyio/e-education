import { persistStore, persistReducer } from 'redux-persist'; //persistReducer,
import storage from 'redux-persist/lib/storage';
import { truthlyObject } from '../../utils';
export default function configure(
	{
		whitelist = [],
		blacklist = [],
		callback = (store) => () => {
			console.warn('this is a hook when persist is recover', store);
		}
	} = {}
) {
	const persistConfigOptions = truthlyObject({ blacklist, whitelist });
	const persistConfig = {
		key: 'root',
		storage,
		...persistConfigOptions
	};
	const persistEnhancer = () => (createStore) => (reducer, initialState, enhancer) => {
		console.log('TCL: persistEnhancer -> start');
		const store = createStore(reducer, initialState, enhancer);
		const persist = persistStore(store, null, callback(store));

		return {
			persist,
			...store
		};
	};
	return {
		persistConfig,
		persistEnhancer,
		persistStore,
		persistReducer
	};
}
