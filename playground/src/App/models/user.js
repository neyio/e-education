const auth = {
	logined: false,
	lastLoginedTime: null
};
export default {
	namespace: 'user',
	state: {
		auth,
		info: {
			name: 'hello',
			gender: 'male'
		}
	},
	effects: {
		*setUser(action, effects) {
			console.log('TCL: *setUser -> args', action, effects);
			const { payload } = action;
			const { put } = effects;
			yield put({
				type: 'update',
				payload
			});
		}
	},
	reducers: {
		update(state, { payload }) {
			state.auth.k[2] = 'baba';
			state.auth.k[1].boy[1] = 'the fuck';
		}
	}
};
