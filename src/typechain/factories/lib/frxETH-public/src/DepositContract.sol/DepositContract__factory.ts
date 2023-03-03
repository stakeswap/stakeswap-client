/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  DepositContract,
  DepositContractInterface,
} from "../../../../../lib/frxETH-public/src/DepositContract.sol/DepositContract";

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
        indexed: false,
        internalType: "bytes",
        name: "pubkey",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "withdrawal_credentials",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "amount",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "index",
        type: "bytes",
      },
    ],
    name: "DepositEvent",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "pubkey",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "withdrawal_credentials",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "deposit_data_root",
        type: "bytes32",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "get_deposit_count",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "get_deposit_root",
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
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060005b620000236001602062000124565b811015620001075760026021826020811062000043576200004362000140565b0154602183602081106200005b576200005b62000140565b015460408051602081019390935282015260600160408051601f19818403018152908290526200008b9162000156565b602060405180830381855afa158015620000a9573d6000803e3d6000fd5b5050506040513d601f19601f82011682018060405250810190620000ce919062000187565b6021620000dd836001620001a1565b60208110620000f057620000f062000140565b015580620000fe81620001b7565b91505062000015565b50620001d3565b634e487b7160e01b600052601160045260246000fd5b818103818111156200013a576200013a6200010e565b92915050565b634e487b7160e01b600052603260045260246000fd5b6000825160005b818110156200017957602081860181015185830152016200015d565b506000920191825250919050565b6000602082840312156200019a57600080fd5b5051919050565b808201808211156200013a576200013a6200010e565b600060018201620001cc57620001cc6200010e565b5060010190565b6111e980620001e36000396000f3fe60806040526004361061003f5760003560e01c806301ffc9a7146100445780632289511814610079578063621fd1301461008e578063c5f2892f146100b0575b600080fd5b34801561005057600080fd5b5061006461005f366004610cdb565b6100d3565b60405190151581526020015b60405180910390f35b61008c610087366004610d55565b61010a565b005b34801561009a57600080fd5b506100a3610941565b6040516100709190610e48565b3480156100bc57600080fd5b506100c5610953565b604051908152602001610070565b60006001600160e01b031982166301ffc9a760e01b148061010457506001600160e01b03198216638564090760e01b145b92915050565b6030861461016e5760405162461bcd60e51b815260206004820152602660248201527f4465706f736974436f6e74726163743a20696e76616c6964207075626b6579206044820152650d8cadccee8d60d31b60648201526084015b60405180910390fd5b602084146101dd5760405162461bcd60e51b815260206004820152603660248201527f4465706f736974436f6e74726163743a20696e76616c696420776974686472616044820152750eec2d8bec6e4cac8cadce8d2c2d8e640d8cadccee8d60531b6064820152608401610165565b6060821461023f5760405162461bcd60e51b815260206004820152602960248201527f4465706f736974436f6e74726163743a20696e76616c6964207369676e6174756044820152680e4ca40d8cadccee8d60bb1b6064820152608401610165565b670de0b6b3a76400003410156102a65760405162461bcd60e51b815260206004820152602660248201527f4465706f736974436f6e74726163743a206465706f7369742076616c756520746044820152656f6f206c6f7760d01b6064820152608401610165565b6102b4633b9aca0034610e71565b1561031d5760405162461bcd60e51b815260206004820152603360248201527f4465706f736974436f6e74726163743a206465706f7369742076616c7565206e6044820152726f74206d756c7469706c65206f66206777656960681b6064820152608401610165565b600061032d633b9aca0034610e9b565b905067ffffffffffffffff8111156103975760405162461bcd60e51b815260206004820152602760248201527f4465706f736974436f6e74726163743a206465706f7369742076616c756520746044820152660dede40d0d2ced60cb1b6064820152608401610165565b60006103a282610b27565b90507f649bbc62d0e31342afea4e5cd82d4049e7e1ee912fc0889aa790803be39038c589898989858a8a6103d7602054610b27565b6040516103eb989796959493929190610ed8565b60405180910390a1600060028a8a600060801b60405160200161041093929190610f4b565b60408051601f198184030181529082905261042a91610f72565b602060405180830381855afa158015610447573d6000803e3d6000fd5b5050506040513d601f19601f8201168201806040525081019061046a9190610f8e565b9050600060028061047e6040848a8c610fa7565b60405160200161048f929190610fd1565b60408051601f19818403018152908290526104a991610f72565b602060405180830381855afa1580156104c6573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052508101906104e99190610f8e565b60026104f8896040818d610fa7565b60405161050c929190600090602001610fe1565b60408051601f198184030181529082905261052691610f72565b602060405180830381855afa158015610543573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052508101906105669190610f8e565b60408051602081019390935282015260600160408051601f198184030181529082905261059291610f72565b602060405180830381855afa1580156105af573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052508101906105d29190610f8e565b90506000600280848c8c6040516020016105ee93929190610ff3565b60408051601f198184030181529082905261060891610f72565b602060405180830381855afa158015610625573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052508101906106489190610f8e565b604051600290610661908890600090889060200161100d565b60408051601f198184030181529082905261067b91610f72565b602060405180830381855afa158015610698573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052508101906106bb9190610f8e565b60408051602081019390935282015260600160408051601f19818403018152908290526106e791610f72565b602060405180830381855afa158015610704573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052508101906107279190610f8e565b90508581146107bb5760405162461bcd60e51b815260206004820152605460248201527f4465706f736974436f6e74726163743a207265636f6e7374727563746564204460448201527f65706f7369744461746120646f6573206e6f74206d6174636820737570706c6960648201527319590819195c1bdcda5d17d9185d1857dc9bdbdd60621b608482015260a401610165565b60016107c960206002611129565b6107d39190611135565b6020541061082d5760405162461bcd60e51b815260206004820152602160248201527f4465706f736974436f6e74726163743a206d65726b6c6520747265652066756c6044820152601b60fa1b6064820152608401610165565b6001602060008282546108409190611148565b909155505060205460005b602081101561092857816001166001036108825782600082602081106108735761087361115b565b01555061093895505050505050565b6002600082602081106108975761089761115b565b0154604080516020810192909252810185905260600160408051601f19818403018152908290526108c791610f72565b602060405180830381855afa1580156108e4573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052508101906109079190610f8e565b9250610914600283610e9b565b91508061092081611171565b91505061084b565b5061093161118a565b5050505050505b50505050505050565b606061094e602054610b27565b905090565b6020546000908190815b6020811015610aa357816001166001036109fd576002600082602081106109865761098661115b565b0154604080516020810192909252810185905260600160408051601f19818403018152908290526109b691610f72565b602060405180830381855afa1580156109d3573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052508101906109f69190610f8e565b9250610a84565b60028360218360208110610a1357610a1361115b565b015460408051602081019390935282015260600160408051601f1981840301815290829052610a4191610f72565b602060405180830381855afa158015610a5e573d6000803e3d6000fd5b5050506040513d601f19601f82011682018060405250810190610a819190610f8e565b92505b610a8f600283610e9b565b915080610a9b81611171565b91505061095d565b50600282610ab2602054610b27565b604051610ac69291906000906020016111a0565b60408051601f1981840301815290829052610ae091610f72565b602060405180830381855afa158015610afd573d6000803e3d6000fd5b5050506040513d601f19601f82011682018060405250810190610b209190610f8e565b9250505090565b60408051600880825281830190925260609160208201818036833701905050905060c082901b8060071a60f81b82600081518110610b6757610b6761115b565b60200101906001600160f81b031916908160001a9053508060061a60f81b82600181518110610b9857610b9861115b565b60200101906001600160f81b031916908160001a9053508060051a60f81b82600281518110610bc957610bc961115b565b60200101906001600160f81b031916908160001a9053508060041a60f81b82600381518110610bfa57610bfa61115b565b60200101906001600160f81b031916908160001a9053508060031a60f81b82600481518110610c2b57610c2b61115b565b60200101906001600160f81b031916908160001a9053508060021a60f81b82600581518110610c5c57610c5c61115b565b60200101906001600160f81b031916908160001a9053508060011a60f81b82600681518110610c8d57610c8d61115b565b60200101906001600160f81b031916908160001a9053508060001a60f81b82600781518110610cbe57610cbe61115b565b60200101906001600160f81b031916908160001a90535050919050565b600060208284031215610ced57600080fd5b81356001600160e01b031981168114610d0557600080fd5b9392505050565b60008083601f840112610d1e57600080fd5b50813567ffffffffffffffff811115610d3657600080fd5b602083019150836020828501011115610d4e57600080fd5b9250929050565b60008060008060008060006080888a031215610d7057600080fd5b873567ffffffffffffffff80821115610d8857600080fd5b610d948b838c01610d0c565b909950975060208a0135915080821115610dad57600080fd5b610db98b838c01610d0c565b909750955060408a0135915080821115610dd257600080fd5b50610ddf8a828b01610d0c565b989b979a50959894979596606090950135949350505050565b60005b83811015610e13578181015183820152602001610dfb565b50506000910152565b60008151808452610e34816020860160208601610df8565b601f01601f19169290920160200192915050565b602081526000610d056020830184610e1c565b634e487b7160e01b600052601260045260246000fd5b600082610e8057610e80610e5b565b500690565b634e487b7160e01b600052601160045260246000fd5b600082610eaa57610eaa610e5b565b500490565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60a081526000610eec60a083018a8c610eaf565b8281036020840152610eff81898b610eaf565b90508281036040840152610f138188610e1c565b90508281036060840152610f28818688610eaf565b90508281036080840152610f3c8185610e1c565b9b9a5050505050505050505050565b828482376fffffffffffffffffffffffffffffffff19919091169101908152601001919050565b60008251610f84818460208701610df8565b9190910192915050565b600060208284031215610fa057600080fd5b5051919050565b60008085851115610fb757600080fd5b83861115610fc457600080fd5b5050820193919092039150565b8183823760009101908152919050565b82848237909101908152602001919050565b838152818360208301376000910160200190815292915050565b6000845161101f818460208901610df8565b67ffffffffffffffff199490941691909301908152601881019190915260380192915050565b600181815b8085111561108057816000190482111561106657611066610e85565b8085161561107357918102915b93841c939080029061104a565b509250929050565b60008261109757506001610104565b816110a457506000610104565b81600181146110ba57600281146110c4576110e0565b6001915050610104565b60ff8411156110d5576110d5610e85565b50506001821b610104565b5060208310610133831016604e8410600b8410161715611103575081810a610104565b61110d8383611045565b806000190482111561112157611121610e85565b029392505050565b6000610d058383611088565b8181038181111561010457610104610e85565b8082018082111561010457610104610e85565b634e487b7160e01b600052603260045260246000fd5b60006001820161118357611183610e85565b5060010190565b634e487b7160e01b600052600160045260246000fd5b838152600083516111b8816020850160208801610df8565b67ffffffffffffffff1993909316919092016020810191909152603801939250505056fea164736f6c6343000811000a";

type DepositContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DepositContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DepositContract__factory extends ContractFactory {
  constructor(...args: DepositContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DepositContract> {
    return super.deploy(overrides || {}) as Promise<DepositContract>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DepositContract {
    return super.attach(address) as DepositContract;
  }
  override connect(signer: Signer): DepositContract__factory {
    return super.connect(signer) as DepositContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DepositContractInterface {
    return new utils.Interface(_abi) as DepositContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DepositContract {
    return new Contract(address, _abi, signerOrProvider) as DepositContract;
  }
}
