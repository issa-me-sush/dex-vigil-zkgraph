//@ts-ignore
import { BigInt, Bytes, Block, Event } from "@hyperoracle/zkgraph-lib";

class SwapData {
    amount0In: BigInt;
    amount1In: BigInt;
    amount0Out: BigInt;
    amount1Out: BigInt;

    constructor(amount0In: BigInt, amount1In: BigInt, amount0Out: BigInt, amount1Out: BigInt) {
        this.amount0In = amount0In;
        this.amount1In = amount1In;
        this.amount0Out = amount0Out;
        this.amount1Out = amount1Out;
    }
}

function detectAnomalies(swapData: SwapData): boolean {
    const volumeThreshold = BigInt.fromString("100000");
    return swapData.amount0In.gt(volumeThreshold) || swapData.amount1In.gt(volumeThreshold) ||
           swapData.amount0Out.gt(volumeThreshold) || swapData.amount1Out.gt(volumeThreshold);
}

function processSwapEvent(event: Event): SwapData {
    const amount0In = BigInt.fromBytes(event.data.slice(0, 32));
    const amount1In = BigInt.fromBytes(event.data.slice(32, 64));
    const amount0Out = BigInt.fromBytes(event.data.slice(64, 96));
    const amount1Out = BigInt.fromBytes(event.data.slice(96, 128));
    return new SwapData(amount0In, amount1In, amount0Out, amount1Out);
}

export function handleBlocks(blocks: Block[]): Bytes {
    let events = blocks[0].events;

    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        if (event.esig == Bytes.fromHexString("0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822")) {
            let swapData = processSwapEvent(event);
            if (detectAnomalies(swapData)) {
           
              
              let calldata = Bytes.fromHexString("0xdc03cf08");
                return calldata.padEnd(32);
            }
        }
    }
    return Bytes.empty(); 
}

