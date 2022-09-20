const { deepStrictEqual } = require('assert')
const solution = require('./solution')

process.on('message', testArr => {
  const [ inputs, expected, index ] = testArr

  let actual = solution(...inputs)

  try {
    // Because we are using child & parent some values get discarded
    // during JSON.stringify
    const shouldBeNaN = isNaN(actual) ||
      typeof actual === 'undefined' ||
      actual === Infinity ||
      actual === -Infinity

    actual = shouldBeNaN
      ? null
      : actual

    // if this fails it will throw an error
    deepStrictEqual(actual, expected)

    // test is successful
    process.send(0)
  } catch (e) {
    console.log(`[Child] index="${index}"`, e.message)
    // test failed
    process.send(1)
  }
})