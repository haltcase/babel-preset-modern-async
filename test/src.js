async function internal (foo) {
  const { bar, baz } = foo
  return bar + baz
}

async function test () {
  await internal({ bar: 1, baz: 3 })
}

export default test
