pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";

contract ScareEdition is ERC721, ERC721Full, ERC721Mintable {
  constructor() ERC721Full("zien scarce editions", "AZSC") public {
  }

  /**
    * @dev function to safely create a new token.
    * Reverts if the given editionNumber is greater than editionCount.
    * @param to The address that will own the minted token
    * @param artistId uint64 ID of the artist who created the work
    * @param workId uint64 ID of the work
    * @param editionNumber uint64 number of this edition
    * @param editionCount uint64 total count for this work
    * @param uri string of the work
    */
  function create(address to, uint64 artistId, uint64 workId, uint64 editionNumber, uint64 editionCount, string memory uri) public onlyMinter returns (bool) {
    require(editionCount > editionNumber);
    uint256 tokenId = (artistId << 192) + (workId << 128) + (editionNumber << 64) + editionCount;

    _mint(to, tokenId);
    _setTokenURI(tokenId, uri); 

    return true;
  }

}
