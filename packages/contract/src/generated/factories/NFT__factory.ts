/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NFT, NFTInterface } from "../NFT";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600381526020017f4e465400000000000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4e46540000000000000000000000000000000000000000000000000000000000815250816000908051906020019062000096929190620000b8565b508060019080519060200190620000af929190620000b8565b505050620001cd565b828054620000c69062000168565b90600052602060002090601f016020900481019282620000ea576000855562000136565b82601f106200010557805160ff191683800117855562000136565b8280016001018555821562000136579182015b828111156200013557825182559160200191906001019062000118565b5b50905062000145919062000149565b5090565b5b80821115620001645760008160009055506001016200014a565b5090565b600060028204905060018216806200018157607f821691505b602082108114156200019857620001976200019e565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61285c80620001dd6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806370a082311161008c578063b88d4fde11610066578063b88d4fde1461025b578063c87b56dd14610277578063d85d3d27146102a7578063e985e9c5146102d7576100ea565b806370a08231146101f157806395d89b4114610221578063a22cb4651461023f576100ea565b8063095ea7b3116100c8578063095ea7b31461016d57806323b872dd1461018957806342842e0e146101a55780636352211e146101c1576100ea565b806301ffc9a7146100ef57806306fdde031461011f578063081812fc1461013d575b600080fd5b61010960048036038101906101049190611b36565b610307565b6040516101169190611ef1565b60405180910390f35b6101276103e9565b6040516101349190611f0c565b60405180910390f35b61015760048036038101906101529190611bc9565b61047b565b6040516101649190611e8a565b60405180910390f35b61018760048036038101906101829190611afa565b6104c1565b005b6101a3600480360381019061019e91906119f4565b6105d9565b005b6101bf60048036038101906101ba91906119f4565b610639565b005b6101db60048036038101906101d69190611bc9565b610659565b6040516101e89190611e8a565b60405180910390f35b61020b6004803603810190610206919061198f565b61070b565b60405161021891906120ae565b60405180910390f35b6102296107c3565b6040516102369190611f0c565b60405180910390f35b61025960048036038101906102549190611abe565b610855565b005b61027560048036038101906102709190611a43565b61086b565b005b610291600480360381019061028c9190611bc9565b6108cd565b60405161029e9190611f0c565b60405180910390f35b6102c160048036038101906102bc9190611b88565b6109e0565b6040516102ce91906120ae565b60405180910390f35b6102f160048036038101906102ec91906119b8565b610a16565b6040516102fe9190611ef1565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806103d257507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806103e257506103e182610aaa565b5b9050919050565b6060600080546103f890612304565b80601f016020809104026020016040519081016040528092919081815260200182805461042490612304565b80156104715780601f1061044657610100808354040283529160200191610471565b820191906000526020600020905b81548152906001019060200180831161045457829003601f168201915b5050505050905090565b600061048682610b14565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006104cc82610659565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561053d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105349061206e565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661055c610b5f565b73ffffffffffffffffffffffffffffffffffffffff16148061058b575061058a81610585610b5f565b610a16565b5b6105ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105c19061200e565b60405180910390fd5b6105d48383610b67565b505050565b6105ea6105e4610b5f565b82610c20565b610629576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106209061208e565b60405180910390fd5b610634838383610cb5565b505050565b6106548383836040518060200160405280600081525061086b565b505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610702576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106f99061204e565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561077c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077390611fce565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060600180546107d290612304565b80601f01602080910402602001604051908101604052809291908181526020018280546107fe90612304565b801561084b5780601f106108205761010080835404028352916020019161084b565b820191906000526020600020905b81548152906001019060200180831161082e57829003601f168201915b5050505050905090565b610867610860610b5f565b8383610f1c565b5050565b61087c610876610b5f565b83610c20565b6108bb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108b29061208e565b60405180910390fd5b6108c784848484611089565b50505050565b60606108d882610b14565b60006006600084815260200190815260200160002080546108f890612304565b80601f016020809104026020016040519081016040528092919081815260200182805461092490612304565b80156109715780601f1061094657610100808354040283529160200191610971565b820191906000526020600020905b81548152906001019060200180831161095457829003601f168201915b5050505050905060006109826110e5565b90506000815114156109985781925050506109db565b6000825111156109cd5780826040516020016109b5929190611e66565b604051602081830303815290604052925050506109db565b6109d6846110fc565b925050505b919050565b6000806109ed6007611164565b90506109f93382611172565b610a03818461134c565b610a0d60076113c0565b80915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b610b1d816113d6565b610b5c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b539061204e565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610bda83610659565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610c2c83610659565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610c6e5750610c6d8185610a16565b5b80610cac57508373ffffffffffffffffffffffffffffffffffffffff16610c948461047b565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610cd582610659565b73ffffffffffffffffffffffffffffffffffffffff1614610d2b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d2290611f4e565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610d9b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9290611f8e565b60405180910390fd5b610da6838383611442565b610db1600082610b67565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e01919061221a565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e589190612193565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4610f17838383611447565b505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610f8b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f8290611fae565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405161107c9190611ef1565b60405180910390a3505050565b611094848484610cb5565b6110a08484848461144c565b6110df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110d690611f2e565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b606061110782610b14565b60006111116110e5565b90506000815111611131576040518060200160405280600081525061115c565b8061113b846115e3565b60405160200161114c929190611e66565b6040516020818303038152906040525b915050919050565b600081600001549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156111e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111d99061202e565b60405180910390fd5b6111eb816113d6565b1561122b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161122290611f6e565b60405180910390fd5b61123760008383611442565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112879190612193565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461134860008383611447565b5050565b611355826113d6565b611394576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161138b90611fee565b60405180910390fd5b806006600084815260200190815260200160002090805190602001906113bb9291906117b3565b505050565b6001816000016000828254019250508190555050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b505050565b505050565b600061146d8473ffffffffffffffffffffffffffffffffffffffff16611790565b156115d6578373ffffffffffffffffffffffffffffffffffffffff1663150b7a02611496610b5f565b8786866040518563ffffffff1660e01b81526004016114b89493929190611ea5565b602060405180830381600087803b1580156114d257600080fd5b505af192505050801561150357506040513d601f19601f820116820180604052508101906115009190611b5f565b60015b611586573d8060008114611533576040519150601f19603f3d011682016040523d82523d6000602084013e611538565b606091505b5060008151141561157e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161157590611f2e565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150506115db565b600190505b949350505050565b6060600082141561162b576040518060400160405280600181526020017f3000000000000000000000000000000000000000000000000000000000000000815250905061178b565b600082905060005b6000821461165d57808061164690612367565b915050600a8261165691906121e9565b9150611633565b60008167ffffffffffffffff81111561169f577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156116d15781602001600182028036833780820191505090505b5090505b60008514611784576001826116ea919061221a565b9150600a856116f991906123b0565b60306117059190612193565b60f81b818381518110611741577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a8561177d91906121e9565b94506116d5565b8093505050505b919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b8280546117bf90612304565b90600052602060002090601f0160209004810192826117e15760008555611828565b82601f106117fa57805160ff1916838001178555611828565b82800160010185558215611828579182015b8281111561182757825182559160200191906001019061180c565b5b5090506118359190611839565b5090565b5b8082111561185257600081600090555060010161183a565b5090565b6000611869611864846120ee565b6120c9565b90508281526020810184848401111561188157600080fd5b61188c8482856122c2565b509392505050565b60006118a76118a28461211f565b6120c9565b9050828152602081018484840111156118bf57600080fd5b6118ca8482856122c2565b509392505050565b6000813590506118e1816127ca565b92915050565b6000813590506118f6816127e1565b92915050565b60008135905061190b816127f8565b92915050565b600081519050611920816127f8565b92915050565b600082601f83011261193757600080fd5b8135611947848260208601611856565b91505092915050565b600082601f83011261196157600080fd5b8135611971848260208601611894565b91505092915050565b6000813590506119898161280f565b92915050565b6000602082840312156119a157600080fd5b60006119af848285016118d2565b91505092915050565b600080604083850312156119cb57600080fd5b60006119d9858286016118d2565b92505060206119ea858286016118d2565b9150509250929050565b600080600060608486031215611a0957600080fd5b6000611a17868287016118d2565b9350506020611a28868287016118d2565b9250506040611a398682870161197a565b9150509250925092565b60008060008060808587031215611a5957600080fd5b6000611a67878288016118d2565b9450506020611a78878288016118d2565b9350506040611a898782880161197a565b925050606085013567ffffffffffffffff811115611aa657600080fd5b611ab287828801611926565b91505092959194509250565b60008060408385031215611ad157600080fd5b6000611adf858286016118d2565b9250506020611af0858286016118e7565b9150509250929050565b60008060408385031215611b0d57600080fd5b6000611b1b858286016118d2565b9250506020611b2c8582860161197a565b9150509250929050565b600060208284031215611b4857600080fd5b6000611b56848285016118fc565b91505092915050565b600060208284031215611b7157600080fd5b6000611b7f84828501611911565b91505092915050565b600060208284031215611b9a57600080fd5b600082013567ffffffffffffffff811115611bb457600080fd5b611bc084828501611950565b91505092915050565b600060208284031215611bdb57600080fd5b6000611be98482850161197a565b91505092915050565b611bfb8161224e565b82525050565b611c0a81612260565b82525050565b6000611c1b82612150565b611c258185612166565b9350611c358185602086016122d1565b611c3e8161249d565b840191505092915050565b6000611c548261215b565b611c5e8185612177565b9350611c6e8185602086016122d1565b611c778161249d565b840191505092915050565b6000611c8d8261215b565b611c978185612188565b9350611ca78185602086016122d1565b80840191505092915050565b6000611cc0603283612177565b9150611ccb826124ae565b604082019050919050565b6000611ce3602583612177565b9150611cee826124fd565b604082019050919050565b6000611d06601c83612177565b9150611d118261254c565b602082019050919050565b6000611d29602483612177565b9150611d3482612575565b604082019050919050565b6000611d4c601983612177565b9150611d57826125c4565b602082019050919050565b6000611d6f602983612177565b9150611d7a826125ed565b604082019050919050565b6000611d92602e83612177565b9150611d9d8261263c565b604082019050919050565b6000611db5603e83612177565b9150611dc08261268b565b604082019050919050565b6000611dd8602083612177565b9150611de3826126da565b602082019050919050565b6000611dfb601883612177565b9150611e0682612703565b602082019050919050565b6000611e1e602183612177565b9150611e298261272c565b604082019050919050565b6000611e41602e83612177565b9150611e4c8261277b565b604082019050919050565b611e60816122b8565b82525050565b6000611e728285611c82565b9150611e7e8284611c82565b91508190509392505050565b6000602082019050611e9f6000830184611bf2565b92915050565b6000608082019050611eba6000830187611bf2565b611ec76020830186611bf2565b611ed46040830185611e57565b8181036060830152611ee68184611c10565b905095945050505050565b6000602082019050611f066000830184611c01565b92915050565b60006020820190508181036000830152611f268184611c49565b905092915050565b60006020820190508181036000830152611f4781611cb3565b9050919050565b60006020820190508181036000830152611f6781611cd6565b9050919050565b60006020820190508181036000830152611f8781611cf9565b9050919050565b60006020820190508181036000830152611fa781611d1c565b9050919050565b60006020820190508181036000830152611fc781611d3f565b9050919050565b60006020820190508181036000830152611fe781611d62565b9050919050565b6000602082019050818103600083015261200781611d85565b9050919050565b6000602082019050818103600083015261202781611da8565b9050919050565b6000602082019050818103600083015261204781611dcb565b9050919050565b6000602082019050818103600083015261206781611dee565b9050919050565b6000602082019050818103600083015261208781611e11565b9050919050565b600060208201905081810360008301526120a781611e34565b9050919050565b60006020820190506120c36000830184611e57565b92915050565b60006120d36120e4565b90506120df8282612336565b919050565b6000604051905090565b600067ffffffffffffffff8211156121095761210861246e565b5b6121128261249d565b9050602081019050919050565b600067ffffffffffffffff82111561213a5761213961246e565b5b6121438261249d565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600061219e826122b8565b91506121a9836122b8565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156121de576121dd6123e1565b5b828201905092915050565b60006121f4826122b8565b91506121ff836122b8565b92508261220f5761220e612410565b5b828204905092915050565b6000612225826122b8565b9150612230836122b8565b925082821015612243576122426123e1565b5b828203905092915050565b600061225982612298565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b838110156122ef5780820151818401526020810190506122d4565b838111156122fe576000848401525b50505050565b6000600282049050600182168061231c57607f821691505b602082108114156123305761232f61243f565b5b50919050565b61233f8261249d565b810181811067ffffffffffffffff8211171561235e5761235d61246e565b5b80604052505050565b6000612372826122b8565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156123a5576123a46123e1565b5b600182019050919050565b60006123bb826122b8565b91506123c6836122b8565b9250826123d6576123d5612410565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b7f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008201527f6578697374656e7420746f6b656e000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000602082015250565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206e6f7220617070726f766564000000000000000000000000000000000000602082015250565b6127d38161224e565b81146127de57600080fd5b50565b6127ea81612260565b81146127f557600080fd5b50565b6128018161226c565b811461280c57600080fd5b50565b612818816122b8565b811461282357600080fd5b5056fea2646970667358221220bd311e7764bd52b61ae079c12d84ba178fcbb73f114c82e827d74031e591392a64736f6c63430008040033";

export class NFT__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NFT> {
    return super.deploy(overrides || {}) as Promise<NFT>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): NFT {
    return super.attach(address) as NFT;
  }
  connect(signer: Signer): NFT__factory {
    return super.connect(signer) as NFT__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTInterface {
    return new utils.Interface(_abi) as NFTInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): NFT {
    return new Contract(address, _abi, signerOrProvider) as NFT;
  }
}
