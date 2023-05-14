// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './lib/Interfaces.sol';
import './lib/Role.sol';
import './lib/IAccessControl.sol';
import './ERC721LatePermit.sol';
import './RoleManager.sol';

// Contract
contract ERC721Dreizehn is
    ERC721,
    ERC721Burnable,
    ERC721Enumerable,
    RoleManager,
    IERC721Dreizehn,
    ERC721LatePermit,
    Pausable
{
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // restricted transfer enable flag
    bool public restrictedTransferEnabled = false;

    // base uri for nfts
    string private _uriPrefix;
    string private _uriSuffix;

    // Constructor
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _defaultUriPrefix,
        string memory _defaultUriSuffix,
        IAccessControl _roleManagerStore
    ) ERC721(_name, _symbol) ERC721LatePermit(_name) RoleManager(_roleManagerStore) {
        _uriPrefix = _defaultUriPrefix;
        _uriSuffix = _defaultUriSuffix;
    }

    // Receive
    receive() external payable {}

    // Public Functions
    function mint(address to) external override onlyRole(Role.TOKEN_MANAGER_ROLE, msg.sender) whenNotPaused {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        emit Mint(msg.sender, to, tokenId);
    }

    // ERC721Metadata (public)
    function tokenURI(uint256 tokenId) public view override(ERC721, IERC721Metadata) returns (string memory) {
        require(_exists(tokenId), 'ERC721Metadata: tokenId not exist');
        return string(abi.encodePacked(_uriPrefix, Strings.toString(tokenId), _uriSuffix));
    }

    function pause() public override onlyRole(Role.OPERATOR_ROLE, msg.sender) {
        _pause();
    }

    function unpause() public override onlyRole(Role.OPERATOR_ROLE, msg.sender) {
        _unpause();
    }

    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, IERC721) whenNotPaused {
        super.transferFrom(from, to, tokenId);
    }

    // Admin Functions
    function setUriPrefix(string calldata prefix) external override onlyRole(Role.OPERATOR_ROLE, msg.sender) {
        _uriPrefix = prefix;
    }

    function setUriSuffix(string calldata suffix) external override onlyRole(Role.OPERATOR_ROLE, msg.sender) {
        _uriSuffix = suffix;
    }

    function enableRestrictedTransfer() external override onlyRole(Role.OPERATOR_ROLE, msg.sender) {
        restrictedTransferEnabled = true;
    }

    function disableRestrictedTransfer() external override onlyRole(Role.OPERATOR_ROLE, msg.sender) {
        restrictedTransferEnabled = false;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        require(
            !restrictedTransferEnabled || (restrictedTransferEnabled && hasRole(Role.TOKEN_MANAGER_ROLE, msg.sender)),
            'ERC721Dreizehn: can not trasfer token because restricted transfer is enabled'
        );
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function burn(uint256 tokenId) public virtual override(IERC721Dreizehn, ERC721Burnable) {
        super.burn(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, ERC721Enumerable, IERC165) returns (bool) {
        return interfaceId == type(IERC721Dreizehn).interfaceId || super.supportsInterface(interfaceId);
    }
}
