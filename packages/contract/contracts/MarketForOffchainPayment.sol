// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './RoleManager.sol';
import './lib/Role.sol';
import './lib/IAccessControl.sol';

interface IERC721WithPermit {
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

    function transferFrom(address from, address to, uint256 tokenId) external;
}

contract MarketForOffchainPayment is RoleManager {
    // Constructor
    constructor(IAccessControl _roleManagerStore) RoleManager(_roleManagerStore) {}

    function transferForTokenManager(
        address erc721WithPermitContractAddress,
        address from,
        address to,
        uint256 tokenId,
        uint256 nonce,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external onlyRole(Role.TOKEN_MANAGER_ROLE, msg.sender) {
        IERC721WithPermit erc721WithPermitContract = IERC721WithPermit(erc721WithPermitContractAddress);
        erc721WithPermitContract.latePermit(from, address(this), tokenId, nonce, deadline, v, r, s);
        erc721WithPermitContract.transferFrom(from, to, tokenId);
    }
}
