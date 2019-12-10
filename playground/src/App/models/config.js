export const NAMESPACE = 'config';

const configuare = (...models) => {
	return [
		...models,
		{
			namespace: NAMESPACE,
			state: {
				models: models.reduce((acc, current) => {
					return { ...acc, [current.namespace]: true };
				}, {})
			},
			effects: {},
			reducers: {}
		}
	];
};

export default configuare;
