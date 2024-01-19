# DEX VIGIL 
zkGraph that keeps an eye on the swap events to detect anomalous behavior and possibly prevent exploits.
Can be extended to any criterias, attack signatures, and track multiple different metrics to keep the pools safe.
A simple scenario has been considered in the current implementation.
- **Image ID**: `E38E5801A8B69486DE670CDF07469244`
- **IPFS Hash**: `QmYYXqRxHHbHU9LD6JdAmd1VhjaRAiLKbhcBNdbFBG9cF7`
- **Publish Transaction**: `0x8de23ed3bb3971e4bd3faa89b1d28191d4b1433467cf3315a81f3afeab18b002`
- **Block Number**: `5105856`
## Usage CLI

> Note: Only `full` image will be processed by zkOracle node. `local` (generated by commands ending with `--local` option) means the zkGraph is compiled locally and only contains partial computation (so that proving and executing will be faster).

The workflow of local zkGraph development must follow: `Develop` (code in /src) -> `Compile` (get compiled wasm image) -> `Execute` (get expected output) -> `Prove` (generate input and pre-test for actual proving in zkOracle) -> `Verify` (verify proof on-chain).

To upload and publish your zkGraph, you should `Upload` (upload code to IPFS), and then `Publish` (register zkGraph on onchain zkGraph Registry).

## Commonly used commands

- **compile**: `npx zkgraph compile`
- **exec**: `npx zkgraph exec <block id>`
- **prove**: ` npx zkgraph prove <block id> <expected state> -i|-t|-p`  
- ……

Read more: https://github.com/hyperoracle/zkgraph-cli#cli
