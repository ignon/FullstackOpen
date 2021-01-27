let t = [1,2,3,4]
console.log(
  t.reduce((a, b) => a + b, 0)
)
console.log(t)

console.log(
  [].reduce((a, b) => a + b, 0)
)