/*
let num = 1;
function printNum() {
  console.log(`my num: ${num}`);
};
printNum();
*/

/*
let fileName = 'f1';
let testNum = 1;
let testFunct = function() {
  testNum = 0;
};
console.log(`testNum in ${fileName} : ${testNum}`);
testFunct();
console.log(`testNum in ${fileName} : ${testNum}`);
*/

import { test2 } from './f2.js';

function test1() {
  console.log('test1 called');
  test2();
};

function test3() {
  console.log('test3 called');
};

export { test1, test3 };