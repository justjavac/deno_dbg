# dbg

A `dbg(…)` function for Deno. Heavy inspired by Rusts [`dbg!(…)` macro](https://doc.rust-lang.org/std/macro.dbg.html).

## Examples

```ts
import { dbg } from "https://deno.land/x/dbg/mod.ts";

const a = 2;
const b = dbg(a * 2) + 1;
//        ^-- [examples/main.ts:4:11] 4 (number)
console.assert(b === 5);
```

factorial implementation([examples/factorial.ts](examples/factorial.ts)):

```ts
import { dbg } from "https://deno.land/x/dbg/mod.ts";

function factorial(n: number): number {
  if (dbg(n <= 1)) {
    return dbg(n);
  }

  return dbg(n * factorial(n - 1));
}

function main() {
  dbg(factorial(5));
}

if (import.meta.main) {
  main();
}
```

This prints:

![](examples/screen.png)
