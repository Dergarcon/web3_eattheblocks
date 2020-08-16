//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.0;

contract MyContract {
    string public functionCalled;

    function sendEther() external payable {
        functionCalled = "sendEther";
    }

    function() external payable {
        functionCalled = "fallback";
    }
}
