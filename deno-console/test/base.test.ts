import { Console } from "../src"
const log = (s: string) => globalThis.console.log(s.slice(0, -1))
const console = new Console(log)
console.log(1)
console.log([1, "2"])
console.log(new Map())
console.log(new Set())
console.log(new Proxy({ a: 1 }, {}))
console.log(Promise.resolve(1))

const a: any = [1]
a[1] = a;
console.log(a)

// TODO: qjs not support Object.hasOwn
// console.log(typeof Object.hasOwn)

// TODO: windows encoding error
console.table(["apples", "oranges", "bananas"]);