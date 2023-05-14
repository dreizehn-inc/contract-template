// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';
import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './lib/Interfaces.sol';

abstract contract ERC721LatePermit is ERC721, EIP712, IERC721Dreizehn {
    // solhint-disable-next-line var-name-mixedcase
    bytes32 private immutable _PERMIT_TYPEHASH =
        keccak256('Permit(address owner,address spender,uint256 tokenId,uint256 nonce,uint256 deadline)');

    /**
     * @dev Initializes the {EIP712} domain separator using the `name` parameter, and setting `version` to `"1"`.
     *
     * It's a good idea to use the same `name` that is defined as the ERC721 token name.
     */
    constructor(string memory name) EIP712(name, '1') {}

    // key is nonce, value is used
    mapping(address => mapping(uint256 => bool)) private _usedNonces;

    /**
     * @dev See {IERC721-latePermit}.
     */
    function latePermit(
        address owner,
        address spender,
        uint256 tokenId,
        uint256 nonce,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external override {
        require(block.timestamp <= deadline, 'ERC721LatePermit: expired deadline');
        require(owner == ERC721.ownerOf(tokenId), 'ERC721LatePermit: not owner');

        _checkNonce(owner, nonce);

        bytes32 structHash = keccak256(abi.encode(_PERMIT_TYPEHASH, owner, spender, tokenId, nonce, deadline));

        bytes32 hash = _hashTypedDataV4(structHash);

        address signer = ECDSA.recover(hash, v, r, s);
        require(signer == owner, 'ERC721LatePermit: invalid signature');

        _useNonce(owner, nonce);
        _approve(spender, tokenId);
    }

    // solhint-disable-next-line func-name-mixedcase
    function DOMAIN_SEPARATOR() external view returns (bytes32) {
        return _domainSeparatorV4();
    }

    function _checkNonce(address owner, uint256 nonce) internal virtual {
        require(_usedNonces[owner][nonce] == false, 'ERC721LatePermit: invalid nonce');
    }

    function _useNonce(address owner, uint256 nonce) internal virtual {
        _checkNonce(owner, nonce);
        _usedNonces[owner][nonce] = true;
    }
}
