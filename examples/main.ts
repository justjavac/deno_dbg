import { dbg } from "../mod.ts";

const a = 2;
const b = dbg(a * 2) + 1;
//        ^-- [examples/main.ts:4:11] 4 (number)
console.assert(b === 5);
