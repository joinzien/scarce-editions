// scripts/deploy.js
async function main() {
  // We get the contract to deploy
  const ScarceEdition = await ethers.getContractFactory('ScarceEdition');
  console.log('Deploying ScarceEdition...');

  // Instantiating a new ScarceEdition smart contract
  const scarceEdition = await ScarceEdition.deploy();

  // Waiting for the deployment to resolve
  await scarceEdition.deployed();
  console.log('Box deployed to:', scarceEdition.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
     console.error(error);
     process.exit(1);
  });





// // SPDX-License-Identifier: MIT

// async function main() {

//     const [deployer] = await ethers.getSigners();
  
//     console.log(
//       "Deploying contracts with the account:",
//       deployer.address
//     );
    
//     console.log("Account balance:", (await deployer.getBalance()).toString());
  
//     const ScarceEdition = await ethers.getContractFactory("ScarceEdition");
//     const scarceEdition = await ScarceEdition.deploy();
  
//     console.log("ScarceEdition address:", scarceEdition.address);
//   }
  
//   main()
//     .then(() => process.exit(0))
//     .catch(error => {
//       console.error(error);
//       process.exit(1);
//     });