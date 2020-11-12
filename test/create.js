// SPDX-License-Identifier: MIT

const ScarceEdition = artifacts.require('ScarceEdition');

let CONTRACT;

contract('ScarceEditionCreate', (accounts) => {
    const addrOwner = accounts[0];
    
    const createError = "Error: Returned error: VM Exception while processing transaction: revert Only the contract owner can perform this operation -- Reason given: Only the contract owner can perform this operation.";
    
    beforeEach(async () => {
        CONTRACT = await ScarceEdition.new({ from: addrOwner });
    });

    it('create: Create a new Edition as the contract owner', async () => {
        const addrRecipient = accounts[1];

        const tokenID = 1234567890
        const tokenURIBefore = "http://scarce.editions/one"
        
        const totalSupplyBefore = await CONTRACT.totalSupply() 

        const createRes = await CONTRACT.create(addrRecipient, tokenID, tokenURIBefore, { from: addrOwner });

        const totalSupplyAfter = await CONTRACT.totalSupply() 
        const tokenURIAfter = await CONTRACT.tokenURI(tokenID);

 	assert.strictEqual(totalSupplyBefore.toNumber() + 1, totalSupplyAfter.toNumber());
        assert.strictEqual(tokenURIBefore, tokenURIAfter);
    });
    
    it('create: Create a new Edition as the contract owner, after setting the operator', async () => {
        const addrRecipient = accounts[1];
	const addrOperator = accounts[2]; 
	
        const tokenID = 1234567890
        const tokenURIBefore = "http://scarce.editions/one"
        
        const setOperatorRes = await CONTRACT.setOperator(addrOperator) 
        
        const totalSupplyBefore = await CONTRACT.totalSupply() 

        const createRes = await CONTRACT.create(addrRecipient, tokenID, tokenURIBefore, { from: addrOwner });

        const totalSupplyAfter = await CONTRACT.totalSupply() 
        const tokenURIAfter = await CONTRACT.tokenURI(tokenID);

 	assert.strictEqual(totalSupplyBefore.toNumber() + 1, totalSupplyAfter.toNumber());
        assert.strictEqual(tokenURIBefore, tokenURIAfter);
    });    

   it('create: Create a new Edition as the contract owner, after setting and resetting the operator', async () => {
        const addrRecipient = accounts[1];
	const addrOperator = accounts[2]; 
	
        const tokenID = 1234567890
        const tokenURIBefore = "http://scarce.editions/one"
        
        const setOperator1Res = await CONTRACT.setOperator(addrOperator) 
        const setOperator2Res = await CONTRACT.setOperator(addrOwner) 
                
        const totalSupplyBefore = await CONTRACT.totalSupply() 

        const createRes = await CONTRACT.create(addrRecipient, tokenID, tokenURIBefore, { from: addrOwner });

        const totalSupplyAfter = await CONTRACT.totalSupply() 
        const tokenURIAfter = await CONTRACT.tokenURI(tokenID);

 	assert.strictEqual(totalSupplyBefore.toNumber() + 1, totalSupplyAfter.toNumber());
        assert.strictEqual(tokenURIBefore, tokenURIAfter);
    });   

    it('create: Create a new Edition as the contract operator', async () => {
        const addrRecipient = accounts[1];
	const addrOperator = accounts[2]; 
	
        const tokenID = 1234567890
        const tokenURIBefore = "http://scarce.editions/one"
        
        const setOperatorRes = await CONTRACT.setOperator(addrOperator) 
        
        const totalSupplyBefore = await CONTRACT.totalSupply() 

        const createRes = await CONTRACT.create(addrRecipient, tokenID, tokenURIBefore, { from: addrOperator });

        const totalSupplyAfter = await CONTRACT.totalSupply() 
        const tokenURIAfter = await CONTRACT.tokenURI(tokenID);

 	assert.strictEqual(totalSupplyBefore.toNumber() + 1, totalSupplyAfter.toNumber());
        assert.strictEqual(tokenURIBefore, tokenURIAfter);
    }); 
    
    it('create: Create a new Edition when not the contract owner', async () => {
        const addrRecipient = accounts[1];

        const tokenID = 1234567890
        const tokenURIBefore = "http://scarce.editions/one"

        const totalSupplyBefore = await CONTRACT.totalSupply.call();

        let actualError = null;
        try {
              const createRes = await CONTRACT.create(addrRecipient, tokenID, tokenURIBefore, { from: addrRecipient });
        } catch (error) {
            actualError = error;
        }

        const totalSupplyAfter = await CONTRACT.totalSupply.call();

        assert.strictEqual(totalSupplyBefore.toNumber(), totalSupplyAfter.toNumber());
        assert.strictEqual(actualError.toString(), createError);
    });  

    
    it('create: Create a new Edition as the operator after that has been removed', async () => {
        const addrRecipient = accounts[1];
	const addrOperator = accounts[2]; 
	
        const tokenID = 1234567890
        const tokenURIBefore = "http://scarce.editions/one"
        
        const setOperator1Res = await CONTRACT.setOperator(addrOperator) 
        const setOperator2Res = await CONTRACT.setOperator(addrOwner) 

        const totalSupplyBefore = await CONTRACT.totalSupply.call();

        let actualError = null;
        try {
              const createRes = await CONTRACT.create(addrRecipient, tokenID, tokenURIBefore, { from: addrOperator });
        } catch (error) {
            actualError = error;
        }

        const totalSupplyAfter = await CONTRACT.totalSupply.call();

        assert.strictEqual(totalSupplyBefore.toNumber(), totalSupplyAfter.toNumber());
        assert.strictEqual(actualError.toString(), createError);
    }); 
                    
});
