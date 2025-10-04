const { foo } = require('./utils.cjs')

test('happy', async () => {
  const result = await foo()
  console.log(result)
})