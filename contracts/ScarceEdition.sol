// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ScarceEdition is ERC721 {
  address private _owner;

  constructor() ERC721("zien scarce editions", "AZSC") public {
    _owner = msg.sender;
  }
  
  modifier onlyOwner() {
    if (msg.sender != _owner) {
      revert("Only the contract owner can perform this operation");
    }
    _;
  }  

  /**
    * @dev function to safely create a new token.
    * Reverts if the given editionNumber is greater than editionCount.
    * @param to The address that will own the minted token
    * @param tokenId, uint256 ID of the work
    * @param uri uri of the work
    */
  function create(address to, uint256 tokenId, string memory uri) public onlyOwner returns (bool) {
    _mint(to, tokenId);
    _setTokenURI(tokenId, uri); 

    return true;
  }

}
