export const NAMESPACE = 'config';

const configuare = (names) => (...models) => {
	return [
		...models,
		{
			namespace: NAMESPACE,
			state: {
				models: names.reduce((acc, current) => {
					return { ...acc, [current]: true };
				}, {})
			},
			effects: {},
			reducers: {}
		}
	];
};

export default configuare;
