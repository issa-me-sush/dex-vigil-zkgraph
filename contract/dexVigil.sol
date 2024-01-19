// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DexVigilContract {
    event AnomalyDetected(bool anomalyDetected, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out);

    function handleAnomaly(bool _anomalyDetected, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out) external {
        emit AnomalyDetected(_anomalyDetected, amount0In, amount1In, amount0Out, amount1Out);
    }
}
