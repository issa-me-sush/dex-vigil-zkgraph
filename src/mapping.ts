//@ts-ignore
import { BigInt, Bytes, Block, Event, ByteArray } from "@hyperoracle/zkgraph-lib";

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

function convertBigIntToByteArray(value: BigInt): ByteArray {
    return ByteArray.fromHexString(value.toHexString().padStart(64, '0'));
}

export function handleBlocks(blocks: Block[]): Bytes {
    let events = blocks[0].events;

    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        if (event.esig == Bytes.fromHexString("0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822")) {
            let swapData = processSwapEvent(event);
            if (detectAnomalies(swapData)) {
                // Manually assemble calldata
                let functionSignature = ByteArray.fromHexString("dc03cf08");
                let anomalyFlag = ByteArray.fromHexString("0000000000000000000000000000000000000000000000000000000000000001"); // True flag
                let amount0InBytes = convertBigIntToByteArray(swapData.amount0In);
                let amount1InBytes = convertBigIntToByteArray(swapData.amount1In);
                let amount0OutBytes = convertBigIntToByteArray(swapData.amount0Out);
                let amount1OutBytes = convertBigIntToByteArray(swapData.amount1Out);

                let calldata = ByteArray.empty();
                calldata = calldata.concat(functionSignature)
                                   .concat(anomalyFlag)
                                   .concat(amount0InBytes)
                                   .concat(amount1InBytes)
                                   .concat(amount0OutBytes)
                                   .concat(amount1OutBytes);
                return Bytes.fromByteArray(calldata);
            }
        }
    }
    return Bytes.empty();
}
