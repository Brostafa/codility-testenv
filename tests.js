/**
 * Custom test runner for Codility.
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
    [, 0],
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
    ['Invalid123', 2],
    null,
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
  ],

  /** Big dataset cases */
  [
    ['100000000000000000000000000000', '1'],
    '100000000000000000000000000001'
  ]
]
  // Add index to each test (in case we have oneTestIndex > 0 we can find its index)
  .map((test, index) => test?.concat([index]))

module.exports = oneTestIndex === -1
  ? ALL_TESTS
  : ALL_TESTS.slice(oneTestIndex, oneTestIndex + 1)