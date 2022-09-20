const { fork } = require('child_process')
const tests = require('./tests').filter(Boolean)
const chalk = require('chalk')
const TIMEOUT_PER_TEST = 5 * 1000

const checkIfTestsAreValid = testsToValidate => {
  const type = typeof testsToValidate

  if (!Array.isArray(testsToValidate)) {
    throw new Error(`Tests aren't of type array. type="${type}"`)
  }

  for (const index in testsToValidate) {
    const test = testsToValidate[index]
    const testType = typeof test

    if (!Array.isArray(test)) {
      throw new Error(`tests[${index}] isn't of type array. type="${testType}"`)
    }

    if (!Array.isArray(test[0])) {
      throw new Error(`tests[${index}][0] INPUTS aren't an array. tests[${index}]="${test[0]}"`)
    }

    if (test.length !== 2) {
      throw new Error(`tests[${index}] has less/more than 2 elements. len="${test.length}"`)
    }
  }
}

const spawnChild = test => {
  const child = fork('./solution-child.js')

  return new Promise((resolve) => {
    setTimeout(() => {
      child.kill('SIGKILL')

      resolve(2)
    }, TIMEOUT_PER_TEST)

    // child will return errorCode
    // errorCode = 0 --> success
    // errorCode = 1 --> failed
    child.on('message', resolve)

    // send test to child
    child.send(test)
  })
}

const start = async () => {
  // validate that we have the correct tests template
  console.log(
    chalk.whiteBright(`[Runner] Found ${tests.length} tests\n`)
  )

  checkIfTestsAreValid(tests)
  let success = 0
  let failed = 0
  let timeout = 0
  const testsWithIndex = tests.map((test, index) => {
    return [
      ...test,
      index
    ]
  })

  const promises = testsWithIndex.map(async (test, index) => {
    const code = await spawnChild(test)

    if (code === 0) {
      success++
    } else if (code === 1) {
      console.log(
        chalk.red(`[Test] index="${index}" failed`)
      )
      failed++
    } else if (code === 2) {
      failed++
      timeout++
    }
  })

  await Promise.all(promises)

  console.log('\n\n----Results----')
  console.log(`[Runner] Total: ${tests.length} | Success: ${success} | Failed: ${failed} (timeout: ${timeout})`)

  if (tests.length === success) {
    console.log(
      chalk.green('[Runner] --> All tests passed!!')
    )
  } else {
    console.log(
      chalk.red(`[Runner] --> Some tests didn't pass`)
    )
  }

  process.exit(0)
}

start()