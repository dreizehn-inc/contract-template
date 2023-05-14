// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ERC721Dreizehn.sol';
import './RoleManager.sol';
import './lib/Role.sol';
import './lib/IAccessControl.sol';

contract Factory is RoleManager {
    // Constructor
    constructor(IAccessControl _roleManagerStore) RoleManager(_roleManagerStore) {}

    function deploy(
        string calldata _name,
        string calldata _symbol,
        string calldata _defaultUriPrefix,
        string calldata _defaultUriSuffix,
        IAccessControl _roleManagerStore,
        bytes32 _salt
    ) external onlyRole(Role.OPERATOR_ROLE, msg.sender) {
        new ERC721Dreizehn{salt: _salt}(_name, _symbol, _defaultUriPrefix, _defaultUriSuffix, _roleManagerStore);
    }

    // calculate address to be deployed
    function calcAddress(
        string calldata _name,
        string calldata _symbol,
        string calldata _defaultUriPrefix,
        string calldata _defaultUriSuffix,
        IAccessControl _roleManagerStore,
        bytes32 _salt
    ) external view returns (address) {
        bytes memory bytecode = type(ERC721Dreizehn).creationCode;

        bytes memory packed = abi.encodePacked(
            bytecode,
            abi.encode(_name, _symbol, _defaultUriPrefix, _defaultUriSuffix, _roleManagerStore)
        );

        bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), address(this), _salt, keccak256(packed)));

        // NOTE: cast last 20 bytes of hash to address
        return address(uint160(uint256(hash)));
    }
}
