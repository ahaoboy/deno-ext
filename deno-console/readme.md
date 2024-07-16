## @deno-ext/console
Reusing Deno's console implementation for different JavaScript engines (such as boa, quickjs, etc.).

```ts
import { Console } from "../src"

const log = (s: string) => globalThis.console.log(
  // Remove the trailing '\n'.
  s.slice(0, -1)
)

const console = new Console(log)
console.log(1)
console.log([1, '2'])
```