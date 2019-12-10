import axios from 'axios';
// import restfulApiMap, { routeMap } from '@education/restful-api-map';
// console.log('routeMap===>', routeMap.get());
// let request = restfulApiMap(axios);
// request('post.comment.create', { postId: 1 }, { title: 'shit' });
// routeMap.reset();
// request = restfulApiMap(axios);
// request('post.comment.create', { postId: 1 }, { title: 'shit' });
// routeMap.merge({
// 	post: {
// 		restful: true,
// 		comment: {
// 			restful: true
// 		}
// 	}
// });
// request = restfulApiMap(axios);
// request('post.comment.create', { postId: 1 }, { title: 'shit' });
// console.log('final=====>', routeMap.get());
export default {
	namespace: 'request',
	effects: {
		*send({ payload }, { call }) {
			const {
				callback = (res) => {
					console.warn('请在payload中增加callback以执行回调，否则你可能无法获取到执行的数据');
					console.log('当前请求结果为:', res);
				},
				options = {}
			} = payload;
			const response = yield call(axios, options);
			callback(response);
		}
	},
	reducers: {}
};
