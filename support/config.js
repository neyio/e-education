/* 
  this file copy from 
  https://github.com/ianstormtaylor/slate-plugins/tree/master/support/rollup 
  and add some custom changes
*/

import factory from './factory';
import test from '../packages/test/package.json';
import themes from '../packages/themes/package.json';
import rbac from '../packages/rbac/package.json';
import routeWithSubroutes from '../packages/route-with-subroutes/package.json';
import restfulApiMap from '../packages/restful-api-map/package.json';
import coreDvaModels from '../packages/core-models/package.json';
// configurations = [...factory(any),... ]
const configurations = [
  ...factory(restfulApiMap),
  ...factory(test),
  ...factory(themes),
  ...factory(rbac),
  ...factory(routeWithSubroutes),
  ...factory(coreDvaModels),
];

export default configurations;
