const tests = require('./tests').filter(Boolean)
const TIMEOUT_PER_TEST = 10 * 1000
const solution = require('./solution')
const { deepStrictEqual } = require('assert')

const checkIfTestsAreValid = testsToValidate => {
  const type = typeof testsToValidate

  if (!Array.isArray(testsToValidate)) {
    throw new Error(`Tests aren't of type array. type="${type}"`)
  }

  for (const index in testsToValidate) {
    const test = testsToValidate[index]
    const testType = typeof test

    if (!Array.isArray(test)) {
      console.log(test)
      throw new Error(`tests[${index}] isn't of type array. type="${testType}"`)
    }

    if (!Array.isArray(test[0])) {
      console.log(test)

      throw new Error(`tests[${index}][0] INPUTS aren't an array. tests[${index}]="${test[0]}"`)
    }

    if (test.length !== 3) {
      console.log(test)

      throw new Error(`tests[${index}] has less/more than 3 elements. We expect you to create arrays of 2. len="${test.length}"`)
    }
  }
}

checkIfTestsAreValid(tests)

for (const index in tests) {
  const [ inputs, output, testIndex ] = tests[index]

  it(`testIndex="${testIndex}"`, () => {
    deepStrictEqual(solution(...inputs), output)
  }).timeout(TIMEOUT_PER_TEST)
}