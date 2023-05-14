// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol';

interface IERC721Dreizehn is IERC721, IERC721Metadata, IERC721Enumerable {
    function mint(address to) external;

    function setUriPrefix(string memory uriPrefix) external;

    function setUriSuffix(string memory uriSuffix) external;

    function burn(uint256 tokenId) external;

    function pause() external;

    function unpause() external;

    function latePermit(
        address owner,
        address spender,
        uint256 tokenId,
        uint256 nonce,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    function enableRestrictedTransfer() external;

    function disableRestrictedTransfer() external;

    event Mint(address from, address to, uint256 tokenId);
}
