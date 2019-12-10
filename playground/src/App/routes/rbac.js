import RBACRouter, { Login, routes } from '@education/rbac';

export { routes, Login };
console.groupCollapsed('RBACRouter[INIT]');
console.log('TCL: routes =>', routes);
console.groupEnd('RBACRouter[INIT]');

export default RBACRouter;
