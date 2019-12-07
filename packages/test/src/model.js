export default {
	namespace: 'test',
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
