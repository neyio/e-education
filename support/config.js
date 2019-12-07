/* 
  this file copy from 
  https://github.com/ianstormtaylor/slate-plugins/tree/master/support/rollup 
  and add some custom changes
*/

import factory from './factory';
// import any from '../packages/any/package.json';
import test from '../packages/test/package.json';
// configurations = [...factory(any),... ]
const configurations = [ ...factory(test) ];

export default configurations;
