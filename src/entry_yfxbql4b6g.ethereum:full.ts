
import { zkmain_lib, asmain_lib, registerHandle } from "@hyperoracle/zkgraph-lib/dsp/ethereum"
import { handleBlocks } from "././mapping.ts"

declare function __call_as_start(): void;

export function zkmain(): void {
  __call_as_start();
  registerHandle(handleBlocks)
  return zkmain_lib()
}

export function asmain(): Uint8Array {
  __call_as_start();
  registerHandle(handleBlocks)
  return asmain_lib()
}
function abort(a: usize, b: usize, c: u32, d: u32): void {}
