import RBACRouter, { Login, routes, needImplementApi } from '@education/rbac';
import { routeMap } from '@education/restful-api-map';
// routeMap.check(needImplementApi);
export { routes, Login, needImplementApi };
console.groupCollapsed('RBACRouter[INIT]');
console.log('TCL: routes =>', routes);
console.groupEnd('RBACRouter[INIT]');

export default RBACRouter;
