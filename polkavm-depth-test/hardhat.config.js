require("@nomicfoundation/hardhat-toolbox");
require('@parity/hardhat-polkadot');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  resolc: {
        compilerSource: 'npm',
    },
    networks: {
        hardhat: {
            polkavm: true,
            nodeConfig: {
                nodeBinaryPath: '../bin/substrate-node',
                dev: true,
                rpcPort: 8000
            },
            adapterConfig: {
                adapterBinaryPath: '../bin/eth-rpc',
                dev: true,
            },
        },
    }
};

