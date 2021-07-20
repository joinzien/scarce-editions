// SPDX-License-Identifier: MIT

// When using typescript, none of the HRE properties are injected in global scope, you will need to import everything explicitly.

import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';

describe('ScarceEdition_Create', function() {
	let CONTRACT: any;
	let ScarceEditionContract: any;
	let addrOwner: SignerWithAddress;
	let addrRecipient: SignerWithAddress;
	let addrOperator: SignerWithAddress;

	const createError: string = "Only the contract owner or operator can perform this operation";

	beforeEach(async () => {
		ScarceEditionContract = await ethers.getContractFactory(
			'ScarceEdition'
		);
		[addrOwner, addrRecipient, addrOperator] = await ethers.getSigners();
		CONTRACT = await ScarceEditionContract.deploy(); // addrOwner.address
		await CONTRACT.deployed();
	});

	describe('Deployment', () => {
		it('Should assign total supply of token to owner', async () => {
			const ownerBalance = await CONTRACT.balanceOf(addrOwner.address);
			expect(await CONTRACT.totalSupply()).to.equal(ownerBalance);
		});
	});

	describe('Transactions', () => {
		//

		it('create: Create a new Edition as the contract owner', async () => {
			const tokenID: number = 1234567890;
			const tokenURIBefore: string = 'http://scarce.editions/one';
			const totalSupplyBefore = await CONTRACT.totalSupply();
			const createRes = await CONTRACT.create(
				addrRecipient.address,
				tokenID,
				tokenURIBefore
			);
			const totalSupplyAfter = await CONTRACT.totalSupply();
			const tokenURIAfter = await CONTRACT.tokenURI(tokenID);
			expect(totalSupplyBefore.toNumber() + 1).to.equal(
				totalSupplyAfter.toNumber()
			);
			expect(tokenURIBefore).to.equal(tokenURIAfter);
		});

		//

		it('create: Create a new Edition as the contract owner, after setting the operator', async () => {
			const tokenID = 1234567890;
			const tokenURIBefore = 'http://scarce.editions/one';
			const setOperatorRes = await CONTRACT.setOperator(
				addrOperator.address
			);
			const totalSupplyBefore = await CONTRACT.totalSupply();
			await CONTRACT.create(
				addrRecipient.address,
				tokenID,
				tokenURIBefore
			);
			const totalSupplyAfter = await CONTRACT.totalSupply();
			const tokenURIAfter = await CONTRACT.tokenURI(tokenID);
			expect(totalSupplyBefore.toNumber() + 1).to.equal(
				totalSupplyAfter.toNumber()
			);
			expect(tokenURIBefore).to.equal(tokenURIAfter);
		});

		//

		it('create: Create a new Edition as the contract owner, after setting and resetting the operator', async () => {
			const tokenID = 1234567890;
			const tokenURIBefore = 'http://scarce.editions/one';
			const setOperator1Res = await CONTRACT.setOperator(
				addrOperator.address
			);
			const setOperator2Res = await CONTRACT.setOperator(
				addrOwner.address
			);
			const totalSupplyBefore = await CONTRACT.totalSupply();
			await CONTRACT.create(
				addrRecipient.address,
				tokenID,
				tokenURIBefore
			);
			const totalSupplyAfter = await CONTRACT.totalSupply();
			const tokenURIAfter = await CONTRACT.tokenURI(tokenID);
			expect(totalSupplyBefore.toNumber() + 1).to.equal(
				totalSupplyAfter.toNumber()
			);
			expect(tokenURIBefore).to.equal(tokenURIAfter);
		});

		//

		it('create: Create a new Edition as the contract operator', async () => {
			const tokenID = 1234567890;
			const tokenURIBefore = 'http://scarce.editions/one';
			const totalSupplyBefore = await CONTRACT.totalSupply();
			await CONTRACT.setOperator(addrOperator.address, {
				from: addrOwner.address,
			});
			await CONTRACT.connect(addrOperator).create(
				addrRecipient.address,
				tokenID,
				tokenURIBefore
			);
			const totalSupplyAfter = await CONTRACT.totalSupply();
			const tokenURIAfter = await CONTRACT.tokenURI(tokenID);
			expect(totalSupplyBefore.toNumber() + 1).to.equal(
				totalSupplyAfter.toNumber()
			);
			expect(tokenURIBefore).to.equal(tokenURIAfter);
		});

		//

		it('create: Create a new Edition when not the contract owner', async () => {
			const tokenID = 1234567890;
			const tokenURIBefore = 'http://scarce.editions/one';
			const totalSupplyBefore = await CONTRACT.totalSupply.call();

			await expect(
				CONTRACT.connect(addrRecipient).create(addrRecipient.address, tokenID, tokenURIBefore)
			  ).to.be.revertedWith("Only the contract owner or operator can perform this operation");

			const totalSupplyAfter = await CONTRACT.totalSupply.call();
			expect(totalSupplyBefore.toNumber()).to.equal(
				totalSupplyAfter.toNumber()
			);
		});

		//

		it('create: Create a new Edition as the operator after that has been removed', async () => {
			const tokenID = 1234567890;
			const tokenURIBefore = 'http://scarce.editions/one';
			const setOperator1Res = await CONTRACT.setOperator(
				addrOperator.address
			);
			const setOperator2Res = await CONTRACT.setOperator(
				addrOwner.address
			);
			const totalSupplyBefore = await CONTRACT.totalSupply.call();

			await expect(
				CONTRACT.connect(addrOperator).create(addrRecipient.address, tokenID, tokenURIBefore)
			  ).to.be.revertedWith("Only the contract owner or operator can perform this operation");

			const totalSupplyAfter = await CONTRACT.totalSupply.call();
			expect(totalSupplyBefore.toNumber()).to.equal(
				totalSupplyAfter.toNumber()
			);
		});

		it('setOperator: set the operator of an Edition when not the contract owner', async () => {
			const totalSupplyBefore = await CONTRACT.totalSupply.call();

			await expect(
				CONTRACT.connect(addrRecipient).setOperator(addrOperator.address)
			  ).to.be.revertedWith("Only the contract owner can perform this operation");

			const totalSupplyAfter = await CONTRACT.totalSupply.call();
			
			expect(totalSupplyBefore.toNumber()).to.equal(
				totalSupplyAfter.toNumber()
			);
		});

	});
});
