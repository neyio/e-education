import RBACRouter, { Login, routes, needImplementApi } from '@education/rbac';
import { routeMap } from '@education/restful-api-map';

setTimeout(() => {
	const checked = routeMap.check(needImplementApi);
	console.log('TCL: checked', checked);
}, 100);

export { routes, Login, needImplementApi };

console.groupCollapsed('RBACRouter[INIT]');
console.log('TCL: routes =>', routes);
console.groupEnd('RBACRouter[INIT]');

export default RBACRouter;
