// Write your solution here
const solution = (num1, num2) => {
  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    return null
  }

  const result = BigInt(num1) + BigInt(num2)

  return result.toString()
}

module.exports = solution
