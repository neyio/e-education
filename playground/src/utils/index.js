export const truthlyObject = (obj) => {
	return Object.entries(obj).reduce((before, [ key, value ]) => {
		if (key && value) {
			before[key] = value;
		}
		return { ...before };
	}, {});
};
