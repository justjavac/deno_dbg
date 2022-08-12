import { dbg } from "../mod.ts";

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
