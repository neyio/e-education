export const NAMESPACE = 'user';
export const ACTIONS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  UPDATE_LOG_STATE: 'updateLogState',
  WATCH_AUTO_LOGIN: 'watchAutoLogin',
  AUTO_LOGIN: 'autoLogin',
};
const auth = {
  isAuthenticated: false,
  tokens: {
    refreshToken: null,
    accessToken: null,
    lastLoginedTime: null,
  },
};
export default () => ({
  namespace: NAMESPACE,
  state: {
    auth,
    info: {
      name: 'hello',
      gender: 'male',
    },
  },
  effects: {
    *[ACTIONS.LOGIN]({ payload }, { put }) {
      yield put({
        type: ACTIONS.UPDATE_LOG_STATE,
        payload,
      });
    },
    *[ACTIONS.LOGOUT](_, { put }) {
      yield put({
        type: ACTIONS.UPDATE_LOG_STATE,
        payload: auth,
      });
    },
    *[ACTIONS.AUTO_LOGIN](_, { select, put }) {
      const auth = yield select(state => state[NAMESPACE].auth);
      if (auth.isAuthenticated) {
        yield put({
          type: ACTIONS.LOGIN,
          payload: auth,
        });
      } else {
        console.warn('please login manually,auth.isAuthenticated detected is false');
      }
    },
  },
  reducers: {
    [ACTIONS.UPDATE_LOG_STATE](state, { payload }) {
      state.auth = { ...state.auth, ...payload };
    },
  },
  subscriptions: {
    [ACTIONS.WATCH_AUTO_LOGIN]({ dispatch }) {
      dispatch({
        type: ACTIONS.AUTO_LOGIN,
      });
    },
  },
});
