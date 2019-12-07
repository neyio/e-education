export default {
	namespace: 'system',
	state: {
		isReduxPersistRecover: false
	},
	effects: {},
	reducers: {
		setReduxPersistRecover(state, { payload }) {
			state.isReduxPersistRecover = payload;
		}
	}
};
