/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Staking, StakingInterface } from "../Staking";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_aggregator",
        type: "address",
      },
      {
        internalType: "address",
        name: "_pair",
        type: "address",
      },
    ],
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
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BalancerV2Vault",
    outputs: [
      {
        internalType: "contract BalancerV2VaultInterface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BalancerV2_rETH_ETH_POOL_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BalancerV2_wstETH_WETH_POOL_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Curve_frxETH_ETH_POOL_ADDRESS",
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
    inputs: [],
    name: "Curve_frxETH_ETH_POOL_LP_TOKEN_ADDRESS",
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
    inputs: [],
    name: "Curve_frxETH_ETH_POOL_TOKEN_INDEX_ETH",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Curve_frxETH_ETH_POOL_TOKEN_INDEX_frxETH",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Curve_stETH_ETH_POOL_ADDRESS",
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
    inputs: [],
    name: "Curve_stETH_ETH_POOL_LP_TOKEN_ADDRESS",
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
    inputs: [],
    name: "Curve_stETH_ETH_POOL_TOKEN_INDEX_ETH",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Curve_stETH_ETH_POOL_TOKEN_INDEX_stETH",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DAI",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDC",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [
      {
        internalType: "contract WETHInterface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "aggregator",
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
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
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
    inputs: [],
    name: "frxETH",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "frxETHMinter",
    outputs: [
      {
        internalType: "contract frxETHMinter",
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
        internalType: "uint256",
        name: "lp",
        type: "uint256",
      },
    ],
    name: "getEffectiveETHAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "ethAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalEffectiveETHAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "ethAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
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
    inputs: [],
    name: "pair",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rETH",
    outputs: [
      {
        internalType: "contract IrETH",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sfrxETH",
    outputs: [
      {
        internalType: "contract sfrxETH",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stETH",
    outputs: [
      {
        internalType: "contract ILido",
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
        internalType: "uint256",
        name: "lp",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "depositAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "unstake",
    outputs: [
      {
        internalType: "uint256",
        name: "lp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ethAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "poolETHAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardToStaker",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wstETH",
    outputs: [
      {
        internalType: "contract IWstETH",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60e06040523480156200001157600080fd5b5060405162001fd238038062001fd283398101604081905262000034916200014e565b60016000819055604080518082018252600a8152692ab734b9bbb0b8102b1960b11b60209182015281518083018352928352603160f81b9281019290925280517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f928101929092527fbfcc8ef98ffbf7b6c3fec7bf5185b566b9863e35a9d83acd49ad6824b5969738908201527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606082015246608082018190523060a08301529060c00160408051601f19818403018152919052805160209091012060045550336080526001600160a01b0391821660a0521660c05262000186565b80516001600160a01b03811681146200014957600080fd5b919050565b600080604083850312156200016257600080fd5b6200016d8362000131565b91506200017d6020840162000131565b90509250929050565b60805160a05160c051611ddd620001f5600039600081816105b2015281816108dd01528181610b3a01528181610bec01528181610c3201528181610ddb0152610e18015260008181610376015281816109df01528181610ef801526110cd015260006106450152611ddd6000f3fe60806040526004361061023f5760003560e01c806395d89b411161012e578063ca8aa0e4116100ab578063dd62ed3e1161006f578063dd62ed3e146106dd578063e0bab4c414610715578063ebdfda5e1461072a578063f2cd3a121461073f578063f781b24e1461075457600080fd5b8063ca8aa0e41461067c578063ca96cc2214610691578063cbc74de71461024b578063ce069614146106a6578063d505accf146106bb57600080fd5b8063ad5c4648116100f2578063ad5c464814610609578063be78e8d9146104a0578063c1fe3e481461061e578063c45a015514610633578063c9ac8c8e1461066757600080fd5b806395d89b4114610539578063a694fc3a1461056b578063a8aa1b31146105a0578063a9059cbb146105d4578063aa6430c6146105f457600080fd5b8063313ce567116101bc5780635a33bbbe116101805780635a33bbbe146104a0578063698e0796146104b557806370a08231146104ca5780637ecebe00146104f757806389a302711461052457600080fd5b8063313ce567146104245780633644e5151461044b5780634aa07e64146104615780634bc0dcb614610476578063565d3e6e1461048b57600080fd5b806323b872dd1161020357806323b872dd1461032f57806323c34a641461034f578063245a7bfc146103645780632e17de78146103b057806330adf81f146103f057600080fd5b8063020b627d1461024b57806306fdde0314610278578063095ea7b3146102bb57806318160ddd146102eb57806321c499401461030f57600080fd5b3661024657005b600080fd5b34801561025757600080fd5b50610260610769565b604051600f9190910b81526020015b60405180910390f35b34801561028457600080fd5b506102ae6040518060400160405280600a8152602001692ab734b9bbb0b8102b1960b11b81525081565b60405161026f9190611b2c565b3480156102c757600080fd5b506102db6102d6366004611b7b565b6107b9565b604051901515815260200161026f565b3480156102f757600080fd5b5061030160015481565b60405190815260200161026f565b34801561031b57600080fd5b5061030161032a366004611ba5565b6107d0565b34801561033b57600080fd5b506102db61034a366004611bbe565b6107f2565b34801561035b57600080fd5b50610301610886565b34801561037057600080fd5b506103987f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161026f565b3480156103bc57600080fd5b506103d06103cb366004611ba5565b6108b5565b60408051948552602085019390935291830152606082015260800161026f565b3480156103fc57600080fd5b506103017f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b34801561043057600080fd5b50610439601281565b60405160ff909116815260200161026f565b34801561045757600080fd5b5061030160045481565b34801561046d57600080fd5b50610398610ca9565b34801561048257600080fd5b50610398610ced565b34801561049757600080fd5b50610398610d10565b3480156104ac57600080fd5b50610260610d54565b3480156104c157600080fd5b50610398610d64565b3480156104d657600080fd5b506103016104e5366004611bfa565b60026020526000908152604090205481565b34801561050357600080fd5b50610301610512366004611bfa565b60056020526000908152604090205481565b34801561053057600080fd5b50610398610d87565b34801561054557600080fd5b506102ae604051806040016040528060068152602001652aa72496ab1960d11b81525081565b34801561057757600080fd5b5061058b610586366004611ba5565b610dcb565b6040805192835260208301919091520161026f565b3480156105ac57600080fd5b506103987f000000000000000000000000000000000000000000000000000000000000000081565b3480156105e057600080fd5b506102db6105ef366004611b7b565b610f96565b34801561060057600080fd5b50610398610fa3565b34801561061557600080fd5b50610398610fc6565b34801561062a57600080fd5b5061039861100a565b34801561063f57600080fd5b506103987f000000000000000000000000000000000000000000000000000000000000000081565b34801561067357600080fd5b5061039861104e565b34801561068857600080fd5b50610398611071565b34801561069d57600080fd5b506103016110b5565b3480156106b257600080fd5b506103986111ac565b3480156106c757600080fd5b506106db6106d6366004611c1c565b6111f0565b005b3480156106e957600080fd5b506103016106f8366004611c8f565b600360209081526000928352604080842090915290825290205481565b34801561072157600080fd5b50610398611404565b34801561073657600080fd5b50610398611448565b34801561074b57600080fd5b5061030161148c565b34801561076057600080fd5b506103986114bb565b6000466001036107795750600190565b60405162461bcd60e51b815260206004820152601060248201526f1d5b9adb9bdddb8818da185a5b881a5960821b60448201526064015b60405180910390fd5b60006107c63384846114de565b5060015b92915050565b6000600154826107de6110b5565b6107e89190611cd8565b6107ca9190611cef565b6001600160a01b038316600090815260036020908152604080832033845290915281205460001914610871576001600160a01b038416600090815260036020908152604080832033845290915290205461084c9083611540565b6001600160a01b03851660009081526003602090815260408083203384529091529020555b61087c848484611596565b5060019392505050565b60004660010361077957507f1e19cf2d73a72ef1332c882f20534b6519be027600020000000000000000011290565b6000806000806108c361163c565b6001546040516370a0823160e01b815230600482015286907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa15801561092c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109509190611d11565b61095a9190611cd8565b6109649190611cef565b33600090815260066020908152604080832054600290925290912054919550908681116109c95760405162461bcd60e51b8152602060048201526013602482015272494e53554646494349454e545f53484152455360681b60448201526064016107b0565b60405163db006a7560e01b8152600481018890527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063db006a75906024016020604051808303816000875af1158015610a30573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a549190611d11565b945080610a618884611cd8565b610a6b9190611cef565b9350838511610ab45760405162461bcd60e51b8152602060048201526015602482015274139151d05512559157d4d51052d157d49155d05491605a1b60448201526064016107b0565b610abe8486611d2a565b9250610ac8610fc6565b6001600160a01b031663d0e30db0856040518263ffffffff1660e01b81526004016000604051808303818588803b158015610b0257600080fd5b505af1158015610b16573d6000803e3d6000fd5b5050505050610b23610fc6565b60405163a9059cbb60e01b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116600483015260248201879052919091169063a9059cbb906044016020604051808303816000875af1158015610b94573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb89190611d3d565b50604051339084156108fc029085906000818181858888f19350505050158015610be6573d6000803e3d6000fd5b50610c127f00000000000000000000000000000000000000000000000000000000000000003388611695565b610c1c33886116fd565b604051639efed7c160e01b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690639efed7c190602401600060405180830381600087803b158015610c7e57600080fd5b505af1158015610c92573d6000803e3d6000fd5b505050505050610ca26001600055565b9193509193565b600046600103610ccc5750737f39c581f595b53c5cb19bd0b3f8da6c935e2ca090565b466005036107795750736320cd32aa674d2898a68ec82e869385fc5f7e2f90565b600046600103610779575073dc24316b9ae028f1497c275eb9192a3ea0f6702290565b600046600103610d335750735e8422345238f34275888049021821e8e08caa1f90565b466005036107795750733e04888b1c07a9805861c19551f7ed53145bd8d490565b6000466001036107795750600090565b60004660010361077957507306325440d014e39736583c165c2963ba99faf14e90565b600046600103610daa575073a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4890565b466005036107795750732f3a40a3db8a7e3d09b0adfefbce4f6f8192755790565b600080610dd661163c565b610e027f000000000000000000000000000000000000000000000000000000000000000033308661178f565b60405163393127a160e01b8152600481018490527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063393127a1906024016020604051808303816000875af1158015610e69573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e8d9190611d11565b5047905060008111610ed05760405162461bcd60e51b815260206004820152600c60248201526b16915493d7d1115413d4d25560a21b60448201526064016107b0565b3360009081526006602052604081208054839290610eef908490611d5f565b925050819055507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663d0e30db0826040518263ffffffff1660e01b815260040160206040518083038185885af1158015610f56573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190610f7b9190611d11565b9150610f8733836117cd565b610f916001600055565b915091565b60006107c6338484611596565b600046600103610779575073a1f8a6807c402e4a15ef4eba36528a3fed24e57790565b600046600103610fe9575073c02aaa39b223fe8d0a0e5c4f27ead9083c756cc290565b46600503610779575073b4fbf271143f4fbf7b91a5ded31805e42b2208d690565b60004660010361102d575073ae7ab96520de3a18e5e111b5eaab095312d7fe8490565b466005036107795750731643e812ae58766192cf7d2cf9567df2c37e9b7f90565b600046600103610d33575073ac3e018457b222d93114458476f3e3416abbe38f90565b600046600103611094575073ae78736cd615f374d3085123a210448e74fc639390565b46600503610779575073ae78736cd615f374d3085123a210448e74fc639390565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690634cdad5069082906370a0823190602401602060405180830381865afa158015611124573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111489190611d11565b6040518263ffffffff1660e01b815260040161116691815260200190565b602060405180830381865afa158015611183573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111a79190611d11565b905090565b6000466001036111cf575073ba12222222228d8ba445958a75a0704d566bf2c890565b46600503610779575073ba12222222228d8ba445958a75a0704d566bf2c890565b428410156112355760405162461bcd60e51b8152602060048201526012602482015271155b9a5cddd85c158c8e881156141254915160721b60448201526064016107b0565b6004546001600160a01b038816600090815260056020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b91908761128883611d72565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e0016040516020818303038152906040528051906020012060405160200161130192919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa15801561136c573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906113a25750886001600160a01b0316816001600160a01b0316145b6113ee5760405162461bcd60e51b815260206004820152601c60248201527f556e697377617056323a20494e56414c49445f5349474e41545552450000000060448201526064016107b0565b6113f98989896114de565b505050505050505050565b6000466001036114275750736b175474e89094c44da98b954eedeac495271d0f90565b4660050361077957507373967c6a0904aa032c103b4104747e88c566b1a290565b60004660010361146b575073bafa44efe7901e04e39dad13167d089c559c113890565b466005036107795750736421d1ca6cd35852362806a2ded2a49b6fa8bef590565b60004660010361077957507f32296969ef14eb0c6d29669c550d4a044913023000020000000000000000008090565b600046600103610779575073f43211935c781d5ca1a41d2041f397b8a7366c7a90565b6001600160a01b0383811660008181526003602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b60008261154d8382611d2a565b91508111156107ca5760405162461bcd60e51b815260206004820152601560248201527464732d6d6174682d7375622d756e646572666c6f7760581b60448201526064016107b0565b6001600160a01b0383166000908152600260205260409020546115b99082611540565b6001600160a01b0380851660009081526002602052604080822093909355908416815220546115e89082611851565b6001600160a01b0380841660008181526002602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906115339085815260200190565b60026000540361168e5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016107b0565b6002600055565b6040516001600160a01b0383166024820152604481018290526116f890849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091526118a6565b505050565b6001600160a01b0382166000908152600260205260409020546117209082611540565b6001600160a01b0383166000908152600260205260409020556001546117469082611540565b6001556040518181526000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020015b60405180910390a35050565b6040516001600160a01b03808516602483015283166044820152606481018290526117c79085906323b872dd60e01b906084016116c1565b50505050565b6001546117da9082611851565b6001556001600160a01b0382166000908152600260205260409020546118009082611851565b6001600160a01b0383166000818152600260205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906117839085815260200190565b60008261185e8382611d5f565b91508110156107ca5760405162461bcd60e51b815260206004820152601460248201527364732d6d6174682d6164642d6f766572666c6f7760601b60448201526064016107b0565b60006118fb826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166119789092919063ffffffff16565b8051909150156116f857808060200190518101906119199190611d3d565b6116f85760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016107b0565b6060611987848460008561198f565b949350505050565b6060824710156119f05760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016107b0565b600080866001600160a01b03168587604051611a0c9190611d8b565b60006040518083038185875af1925050503d8060008114611a49576040519150601f19603f3d011682016040523d82523d6000602084013e611a4e565b606091505b5091509150611a5f87838387611a6a565b979650505050505050565b60608315611ad9578251600003611ad2576001600160a01b0385163b611ad25760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016107b0565b5081611987565b6119878383815115611aee5781518083602001fd5b8060405162461bcd60e51b81526004016107b09190611b2c565b60005b83811015611b23578181015183820152602001611b0b565b50506000910152565b6020815260008251806020840152611b4b816040850160208701611b08565b601f01601f19169190910160400192915050565b80356001600160a01b0381168114611b7657600080fd5b919050565b60008060408385031215611b8e57600080fd5b611b9783611b5f565b946020939093013593505050565b600060208284031215611bb757600080fd5b5035919050565b600080600060608486031215611bd357600080fd5b611bdc84611b5f565b9250611bea60208501611b5f565b9150604084013590509250925092565b600060208284031215611c0c57600080fd5b611c1582611b5f565b9392505050565b600080600080600080600060e0888a031215611c3757600080fd5b611c4088611b5f565b9650611c4e60208901611b5f565b95506040880135945060608801359350608088013560ff81168114611c7257600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215611ca257600080fd5b611cab83611b5f565b9150611cb960208401611b5f565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b80820281158282048414176107ca576107ca611cc2565b600082611d0c57634e487b7160e01b600052601260045260246000fd5b500490565b600060208284031215611d2357600080fd5b5051919050565b818103818111156107ca576107ca611cc2565b600060208284031215611d4f57600080fd5b81518015158114611c1557600080fd5b808201808211156107ca576107ca611cc2565b600060018201611d8457611d84611cc2565b5060010190565b60008251611d9d818460208701611b08565b919091019291505056fea2646970667358221220552e98b02b788fac305399476ff72077dc45e66760b9fd63fd051b30757335fe64736f6c63430008110033";

type StakingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Staking__factory extends ContractFactory {
  constructor(...args: StakingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _aggregator: PromiseOrValue<string>,
    _pair: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Staking> {
    return super.deploy(
      _aggregator,
      _pair,
      overrides || {}
    ) as Promise<Staking>;
  }
  override getDeployTransaction(
    _aggregator: PromiseOrValue<string>,
    _pair: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_aggregator, _pair, overrides || {});
  }
  override attach(address: string): Staking {
    return super.attach(address) as Staking;
  }
  override connect(signer: Signer): Staking__factory {
    return super.connect(signer) as Staking__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingInterface {
    return new utils.Interface(_abi) as StakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Staking {
    return new Contract(address, _abi, signerOrProvider) as Staking;
  }
}
