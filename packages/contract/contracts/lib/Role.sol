// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library Role {
    bytes32 public constant TOKEN_MANAGER_ROLE =
        keccak256("TOKEN_MANAGER_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
}
