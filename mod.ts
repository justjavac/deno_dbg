/**
 * A `dbg(…)` function for Deno. Heavy inspired by Rusts [`dbg!(…)` macro](https://doc.rust-lang.org/std/macro.dbg.html).
 *
 * a example:
 *
 * ```ts
 * import { dbg } from "https://deno.land/x/dbg/mod.ts";
 * const a = 2;
 * const b = dbg(a * 2) + 1;
 * //        ^-- [examples/main.ts:4:11] 4 (number)
 * console.assert(b === 5);
 * ```
 * @module
 */

import { fromFileUrl, relative } from "https://deno.land/std@0.152.0/path/mod.ts";

let warn = (...msg: string[]) => {
  console.warn(...msg);
  warn = () => {};
};

/**
 * Prints and returns the value of a given expression for quick and dirty debugging.
 */
export function dbg<T>(value: T): T {
  try {
    throw new Error();
  } catch (err) {
    const stackFrames = (err as Error).stack!.split("\n");
    let fn = "";
    let file: string;
    let line: string;
    let col: string;

    if (stackFrames.length > 3) {
      [, fn, file, line, col] = stackFrames[2].match(/at (\S*) \((.*?)\:(\d+)\:(\d+)\)/)!;
    } else if (stackFrames.length === 3) {
      [, file, line, col] = stackFrames[2].match(/at (.*?)\:(\d+)\:(\d+)/)!;
    } else {
      // unreachable
      throw new Error("Could not find stack frame");
    }

    if (file.startsWith("file://")) {
      file = fromFileUrl(file);
      try {
        file = relative(".", file);
      } catch (err) {
        if ((err as Error).name === "PermissionDenied") {
          warn(
            "%cWarning: %cNo read access to <CWD>, use full path. Or run again with %c--allow-read%c. See https://github.com/justjavac/deno_dbg#read-permission",
            "color:yellow",
            "color:white",
            "color:blue",
            "color:white",
          );
        }
      }
    }

    console.debug(
      "%c[%s:%s:%s%s] %c(%s) %c%s",
      "color:gray",
      file,
      line,
      col,
      fn ? ` (${fn})` : "",
      "color:white",
      value,
      "color:blue",
      typeof value,
    );

    return value;
  }
}
