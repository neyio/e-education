export default {
	rbac: {
		urls: {
			login: [ '/login', 'post' ]
		},
		profile: {
			urls: {
				account: [ '/api/profile/account', 'get' ],
				base: [ '/api/profile', 'get' ]
			}
		},
		post: {
			restful: true,
			comment: {
				restful: true
			}
		}
	}
};
