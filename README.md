# Scarce Editions
Scarce editions are unique pieces of art, available for a limited time. Used by [zien][zien].

## Design

[Non-fungible tokens][nft] are used to represent each edition. Based on the [ERC721][erc721] standard. ERC721 uses a uint256 as the unique id of each token. 

Scarce Editions segment that number into a number of fields to generate a unique number for each edition:
- 64 bits for the Artist ID.
- 64 bits for the Work ID.
- 64 bits for the edition number.
- 64 bits for the edition size. 

## Usage

### Creating an Edition

`bool success = scareEditions.create(address to, uint64 artistId, uint64 workId, uint64 editionNumber, uint64 editionCount, string memory uri);`

Where: 
- `to` The address that will own the scarce edition.
- `artistId` uint64 ID of the artist who created the work.
- `workId` uint64 ID of the work.
- `editionNumber` uint64 number of this edition.
- `editionCount` uint64 total count for this edition.
- `uri` The URI of the work.

### Transfer an Edition

`scareEditions.transferFrom(address from, address to, uint256 tokenId)`

Where:
- `from` The address that currently own the scarce edition.
- `to` The address that will own the scarce edition.
- `tokenId` uint256 ID of the scarce edition.

## Developing

We welcome [contributions][contrib], be they [issues][issues], [pull requests][pullrequest] or in another form that follow our [code of conduct][codeofconduct].

[zien]: https://github.com/axna/zien
[nft]: https://en.wikipedia.org/wiki/Non-fungible_token
[erc721]: http://erc721.org/
[issues]: ../../issues/new/choose
[pullrequest]: .github/PULL_REQUEST_TEMPLATE.md
[contrib]: .github/CONTRIBUTING.md
[codeofconduct]: ./CODE_OF_CONDUCT.md 
