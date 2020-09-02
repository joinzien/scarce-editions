pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ScareEdition is ERC721 {
  constructor() ERC721("zien scarce editions", "AZSC") public {
  }

  /**
    * @dev function to safely create a new token.
    * Reverts if the given editionNumber is greater than editionCount.
    * @param to The address that will own the minted token
    * @param tokenId, uint256 ID of the work
    * @param uri uri of the work
    */
  function create(address to, uint256 tokenId, string memory uri) public returns (bool) {
    _mint(to, tokenId);
    _setTokenURI(tokenId, uri); 

    return true;
  }

}
