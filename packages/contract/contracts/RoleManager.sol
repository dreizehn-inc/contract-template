// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./lib/IAccessControl.sol";
import {IAccessControl as _IAccessControl} from "@openzeppelin/contracts/access/IAccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// このコントラクトはあくまで問い合わせ用で、Storageは持たない
abstract contract RoleManager is _IAccessControl {
    IAccessControl accessControlStore;

    constructor(IAccessControl _accessControlStore) {
        accessControlStore = _accessControlStore;
    }

    modifier onlyRole(bytes32 role, address account) {
        if (!hasRole(role, account)) {
            revert(
                string(
                    abi.encodePacked(
                        "AccessControl: account ",
                        Strings.toHexString(account),
                        " is missing role ",
                        Strings.toHexString(uint256(role), 32)
                    )
                )
            );
        }
        _;
    }

    function hasRole(bytes32 role, address account)
        public
        override
        view
        returns (bool)
    {
        return accessControlStore.hasRole(role, account);
    }

    function getRoleAdmin(bytes32 role) external override view returns (bytes32) {
        return accessControlStore.getRoleAdmin(role);
    }

    function grantRole(bytes32 role, address account) external override {
        return accessControlStore.grantRole(role, account);
    }

    function revokeRole(bytes32 role, address account) external override {
        return accessControlStore.revokeRole(role, account);
    }

    function renounceRole(bytes32 role, address account) external override {
        return accessControlStore.renounceRole(role, account);
    }
}
