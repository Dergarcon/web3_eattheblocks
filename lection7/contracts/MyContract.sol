//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.0;

contract MyContract {
    event MyEvent(uint256 indexed id, uint256 indexed date, string indexed value);
    uint256 id;

    function emitEvent(string calldata value) external {
        emit MyEvent(id, block.timestamp, value);
        id++;
    }
}