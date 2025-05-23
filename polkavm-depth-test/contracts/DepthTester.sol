// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DepthTester {
    event ReachedDepth(uint256 depth);

    function dive(uint256 depth) public {
        emit ReachedDepth(depth);

        if (depth > 0) {
            DepthTester(address(this)).dive(depth - 1);
        }
    }
}
