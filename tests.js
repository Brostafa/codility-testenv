/**
 * Custom test runner.
 * 
 * We use JSON.stringify to send these tests to the child
 * which is handled automatically by child.send() function call and it ends up having some caveats
 * 
 * @caveat
 * NaN, Infinity, -Infinity, undefined will be considered as null
 * 
 * @resources
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
 */

// if -1, run all tests
const oneTestIndex = -1

const ALL_TESTS = [
  // [[INPUTS], OUTPUT]
  // examples:
  // [ [1, 2], 3 ] -- SUM(1,2)   // 3
  // [ [[3,2,4,-5]], [-5, 2,3,4] ] -- SORT([3,2,4,-5])   // [-5, 2,3,4]
  // [ [['hello', 'a', 'b', 'a'], 'a'], 2 ] -- COUNT(['hello', 'a', 'b', 'a'], 'a')   // 2

  /** Invalid & edge cases */
  [
    [],
    null
  ],
  [
    [null, 0],
    null
  ],
  [
    [1],
    null
  ],
  [
    [, 2],
    null
  ],
  [
    ['Invalid', 2],
    null
  ],

  /** Simple cases */
  [
    [-1, 2],
    '1'
  ],
  [
    [1, 2],
    '3'
  ],
  [
    ['2', 2],
    '4'
  ]

  /** Big dataset cases */
  [
    ['100000000000000000000000000000', '1'],
    '100000000000000000000000000001'
  ]
]

module.exports = oneTestIndex === -1
  ? ALL_TESTS
  : ALL_TESTS.slice(oneTestIndex, oneTestIndex + 1)