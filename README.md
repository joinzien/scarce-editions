# Scarce Editions
Scarce editions are unique pieces of art, available for a limited time. Used by [zien][zien].

## Features
- [Non-fungible tokens][nft] are used to represent each edition. 
- Based on the [ERC721][erc721] standard. 
- ERC721 uses a uint256 as the unique id of each token. 

## Developing

### Prerequisites

This project is developed using Node.js with the following versions 

* node 10.19.0
* npm 6.13.4

It is recommended that [Node Version Manager][nvm] is used to ensure the correct versions are used. 

    nvm install lts/dubnium
    nvm use lts/dubnium
    
The expected output is    
    Now using node v10.19.0 (npm v6.13.4)

### Dependencies

Install dependencies using [npm][npm]

    npm install

This will install all the required packages to develop using the Scarce Editions Contract.

## Testing

Start `ganache` in a separate terminal tab or window.

    npm run ganache

Run the tests

    npm test

## Contribute
We welcome [contributions][contrib], be they [issues][issues], [pull requests][pullrequest] or in another form that follow our [code of conduct][codeofconduct].

[zien]: https://zien.io/
[nft]: https://en.wikipedia.org/wiki/Non-fungible_token
[erc721]: http://erc721.org/
[npm]: https://docs.npmjs.com/getting-started/installing-node
[nvm]: https://github.com/nvm-sh/nvm
[issues]: ../../issues/new/choose
[pullrequest]: .github/PULL_REQUEST_TEMPLATE.md
[contrib]: .github/CONTRIBUTING.md
[codeofconduct]: ./CODE_OF_CONDUCT.md 
