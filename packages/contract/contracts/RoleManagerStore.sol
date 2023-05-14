// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./lib/Role.sol";

contract RoleManagerStore is AccessControl {
    IAccessControl roleManagerStore;

    constructor(
        address _admin,
        address _operator,
        address _tokenManager
    ) {
        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
        _setupRole(Role.TOKEN_MANAGER_ROLE, _tokenManager);
        _setupRole(Role.OPERATOR_ROLE, _operator);
    }

    function checkRole(bytes32 role) public view {
        _checkRole(role);
    }

    function setOperator(address account)
        external
        onlyRole(Role.OPERATOR_ROLE)
    {
        _grantRole(Role.OPERATOR_ROLE, account);
    }

    function removeOperator(address account)
        external
        onlyRole(Role.OPERATOR_ROLE)
    {
        _revokeRole(Role.OPERATOR_ROLE, account);
    }

    function setTokenManager(address account)
        external
        onlyRole(Role.OPERATOR_ROLE)
    {
        _grantRole(Role.TOKEN_MANAGER_ROLE, account);
    }

    function removeTokenManager(address account)
        external
        onlyRole(Role.OPERATOR_ROLE)
    {
        _revokeRole(Role.TOKEN_MANAGER_ROLE, account);
    }
}
