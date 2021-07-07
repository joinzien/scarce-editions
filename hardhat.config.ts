// ethers plugin required to interact with the contract
require('@nomiclabs/hardhat-ethers');

import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-solhint';
import 'solidity-coverage';
import 'hardhat-gas-reporter';
import 'hardhat-abi-exporter';

import { HardhatUserConfig } from 'hardhat/types';

// Here you can write Hardhat tasks. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// private key from the pre-funded Moonbase Alpha testing account
const { privateKey } = require('./secrets.json');

const config: HardhatUserConfig = {
	abiExporter: {
		path: './abi',
		clear: true,
		flat: true,
		only: [],
		spacing: 2,
	},
	networks: {
		// Moonbase Alpha network specification
		moonbase: {
		  url: `https://rpc.testnet.moonbeam.network`,
		  chainId: 1287,
		  accounts: [privateKey]
		}
	},
	solidity: {
		version: '0.7.6',
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};

export default config;
