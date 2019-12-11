import axios from 'axios';

import { NAMESPACE as UserNamespace, ACTIONS as UserActions } from './user';
import restfulApiMap, { routeMap } from '@education/restful-api-map'; // check package readme.md to know useage
import apis from '../api';
export const NAMESPACE = 'request';
export const ACTIONS = {
	WATCH_USER_AUTH_ACTIONS: 'watchUserAuthActions',
	INIT_SUBSCRIPTION: 'initSubscription',
	RESET_REQUEST_CREATOR: 'resetRequestCreator'
};

const generateRouteMap = routeMap.reset(apis);
console.groupCollapsed('ROUTE_MAP:[INIT]');
console.log(generateRouteMap);
console.groupEnd('ROUTE_MAP:[INIT]');

export default {
	namespace: NAMESPACE,
	state: {
		request: null,
		restfulApiRequest: null,
		routeMap: generateRouteMap,
		ACTIONS
	},
	effects: {
		*[ACTIONS.WATCH_USER_AUTH_ACTIONS](_, { take, put, select }) {
			let setAxiosHeadersInterceptor = null;

			while (true) {
				const { type, payload } = yield take([
					`${UserNamespace}/${UserActions.LOGIN}`,
					`${UserNamespace}/${UserActions.LOGOUT}`
				]);
				console.groupCollapsed('USER AUTH: LOGIN|LOGOUT');
				console.log('TCL: watchUserAuthActions -> type', type, payload);
				console.groupEnd('USER AUTH: LOGIN|LOGOUT');
				const { tokens: { accessToken } } = payload;
				if (!accessToken) {
					console.warn('access_token is not in payload , please check it ,interceptors inject failed ');
					continue;
				}
				const preRequestCreator = yield select((state) => state[NAMESPACE].request);
				// 如果 第二次覆盖，则重置请求器。
				if (setAxiosHeadersInterceptor && preRequestCreator) {
					preRequestCreator.interceptors.request.eject(setAxiosHeadersInterceptor);
				}
				//如果是登陆 则 重建请求器，axios重新创建实例，废弃之前的请求器
				if (type === `${UserNamespace}/${UserActions.LOGIN}`) {
					if (!payload.isAuthenticated) {
						console.warn('ignore login action,please check if var(isAuthenticated) is true  ');

						continue;
					}
					const instance = axios.create();
					// 现在，在超时前，所有请求都会等待 2.5 秒
					instance.defaults.timeout = 10000;
					setAxiosHeadersInterceptor = instance.interceptors.request.use(
						function(config) {
							config.headers = {
								...config.headers,
								Authorization: `Bearer ${accessToken}`
							};
							return config;
						},
						function(error) {
							return Promise.reject(error);
						}
					);
					const restfulApiRequest = restfulApiMap(instance);
					yield put({
						type: `${ACTIONS.RESET_REQUEST_CREATOR}`,
						payload: { request: instance, restfulApiRequest: restfulApiRequest }
					});
					console.groupCollapsed('TEST:RESTFULAPIREQUEST');
					const fakeRequestCreator = restfulApiMap(instance, void 0, (_, options) => {
						return options;
					});
					console.log('fake request', fakeRequestCreator('rbac.login'));
					console.groupEnd('TEST:RESTFULAPIREQUEST');

					continue;
				}

				if (type === `${UserNamespace}/${UserActions.LOGOUT}`) {
					yield put({
						type: `${ACTIONS.RESET_REQUEST_CREATOR}`,
						payload: { request: null, restfulApiRequest: null }
					});
					continue;
				}
			}
		},

		*send({ payload }, { call }) {
			const {
				callback = (res) => {
					console.warn('请在payload中增加callback以执行回调，否则你可能无法获取到执行的数据', '当前请求结果为:', res);
				},
				options = {}
			} = payload;
			const response = yield call(axios, options);
			callback(response);
		}
	},
	reducers: {
		[ACTIONS.RESET_REQUEST_CREATOR](state, { payload }) {
			const { request, restfulApiRequest } = payload;
			return {
				...state,
				request,
				restfulApiRequest
			};
		}
	},
	subscriptions: {
		[ACTIONS.INIT_SUBSCRIPTION]({ dispatch }) {
			dispatch({
				type: ACTIONS.WATCH_USER_AUTH_ACTIONS
			});
		}
	}
};
