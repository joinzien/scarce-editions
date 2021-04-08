// SPDX-License-Identifier: MIT

const ScarceEdition = artifacts.require('ScarceEdition');

let CONTRACT;

contract('ScarceEditionBatchCreate', (accounts) => {
    const addrOwner = accounts[0];
    
    const createError = "Error: Returned error: VM Exception while processing transaction: revert Only the contract owner or operator can perform this operation -- Reason given: Only the contract owner or operator can perform this operation.";
    
    beforeEach(async () => {
        CONTRACT = await ScarceEdition.new({ from: addrOwner });
    });

    it('batchCreate: Create a new Edition as the contract owner', async () => {
        const addrRecipient = accounts[1];
        
        const to_addresses =[
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1],
        	accounts[1], 
        	accounts[1],
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1],
        	accounts[1], 
        	accounts[1], 
       		accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1],
        	accounts[1], 
        	accounts[1],
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1], 
        	accounts[1],
        	accounts[1], 
        	accounts[1],           	       	
        ];
        
        const token_ids = [1, 2, 3, 4, 5, 6, 7 ,8 ,9, 10, 1, 2, 3, 4, 5, 6, 7 ,8 ,9, 10,
         		   1, 2, 3, 4, 5, 6, 7 ,8 ,9, 10, 1, 2, 3, 4, 5, 6, 7 ,8 ,9, 10];
        
        const urls = [
        	"http://url.io/drop/01/scarce-edition/211345a53c261a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c262a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c263a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c264a7e877b1e05a8f239e9",        	                		"http://url.io/drop/01/scarce-edition/211345a53c265a7e877b1e05a8f239e9",	        
        	"http://url.io/drop/01/scarce-edition/211345a53c266a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c267a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c268a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c269a7e877b1e05a8f239e9",        	                		"http://url.io/drop/01/scarce-edition/211345a53c26aa7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c261a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c262a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c263a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c264a7e877b1e05a8f239e9",        	                		"http://url.io/drop/01/scarce-edition/211345a53c265a7e877b1e05a8f239e9",	        
        	"http://url.io/drop/01/scarce-edition/211345a53c266a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c267a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c268a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c269a7e877b1e05a8f239e9",        	                		"http://url.io/drop/01/scarce-edition/211345a53c26aa7e877b1e05a8f239e9",        	
      		"http://url.io/drop/01/scarce-edition/211345a53c261a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c262a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c263a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c264a7e877b1e05a8f239e9",        	                		"http://url.io/drop/01/scarce-edition/211345a53c265a7e877b1e05a8f239e9",	        
        	"http://url.io/drop/01/scarce-edition/211345a53c266a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c267a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c268a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c269a7e877b1e05a8f239e9",        	                		"http://url.io/drop/01/scarce-edition/211345a53c26aa7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c261a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c262a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c263a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c264a7e877b1e05a8f239e9",        	                		"http://url.io/drop/01/scarce-edition/211345a53c265a7e877b1e05a8f239e9",	        
        	"http://url.io/drop/01/scarce-edition/211345a53c266a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c267a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c268a7e877b1e05a8f239e9",
        	"http://url.io/drop/01/scarce-edition/211345a53c269a7e877b1e05a8f239e9",        	                		"http://url.io/drop/01/scarce-edition/211345a53c26aa7e877b1e05a8f239e9", 
        ];
        
        const totalSupplyBefore = await CONTRACT.totalSupply() 

        const createRes = await CONTRACT.batchCreate(10, to_addresses, token_ids, urls, { from: addrOwner });

        const totalSupplyAfter = await CONTRACT.totalSupply() 

 	assert.strictEqual(totalSupplyBefore.toNumber() + 10, totalSupplyAfter.toNumber());
    });
                    
});
