/*
num = 2;
printNum();
*/

/*
fileName = 'f2';
console.log(`testNum in ${fileName} : ${testNum}`);
testNum = 2;
console.log(`testNum in ${fileName} : ${testNum}`);
testFunct();
console.log(`testNum in ${fileName} : ${testNum}`);
*/

import { test1, test3 } from './f1.js';

function test2() {
  console.log('test2 called');
  test3();
};

test1();

export { test2 };