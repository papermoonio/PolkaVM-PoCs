# DepthTester PoC

A minimal Solidity contract that recursively calls itself to test the maximum call stack depth.

## Contract

```solidity
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
```

## How to Run

Run the test with Hardhat:

```bash
npx hardhat test
```

## Key Observations from the Tests

The contract attempts to recursively call `dive(depth-1)` until it reaches zero.

The tests show successful calls up to a depth of 5, but fail starting from depth 6.

**This indicates a maximum call stack depth limit of 5 in the tested environment (Westend Hub).**

Example output snippet:

```yaml
Trying depth: 1
Trying depth: 2
Trying depth: 3
Trying depth: 4
Trying depth: 5
Caught error at depth: 6
Error message: execution reverted: Max call depth before failure: 5
```
## Contract Deployment

The contract is deployed at: `0x4563ff769a3c1718ab3b96ae2f887b077febe690`

## Logs from Westend Hub (Using cast CLI)

**Successful call at depth 5 (maximum supported):**

```bash
cast send 0x4563ff769a3c1718ab3b96ae2f887b077febe690 "dive(uint256)" 5 --rpc-url https://westend-asset-hub-eth-rpc.polkadot.io --private-key <INSERT_YOUR_PRIVATE_KEY>
```

Response:

```bash
status                  1 (success)
logs                    [{"address":"0x4563ff769a3c1718ab3b96ae2f887b077febe690","topics":["0x72697854..."],"data":"0x...05"}]
```

**Note:** The call succeeds at depth 5, confirmed by the emitted event data `"0x...05"`.

**Failure starting at depth 6:**

```bash
cast send 0x4563ff769a3c1718ab3b96ae2f887b077febe690 "dive(uint256)" 6 --rpc-url https://westend-asset-hub-eth-rpc.polkadot.io --private-key <INSERT_YOUR_PRIVATE_KEY>
```

Response:

```bash
Error: server returned an error response: error code 3: execution reverted: , data: "0x"
```

**Highlight:** Depth 6 calls revert, indicating the call stack limit has been reached.

## Summary

Unlike the standard EVM's theoretical limit of ~1024 call stack frames, the tests for the Hub show a much stricter limit of only 5 recursive calls.