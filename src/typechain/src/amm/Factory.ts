/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface FactoryInterface extends utils.Interface {
  functions: {
    "BalancerV2Vault()": FunctionFragment;
    "BalancerV2_rETH_ETH_POOL_ID()": FunctionFragment;
    "BalancerV2_wstETH_WETH_POOL_ID()": FunctionFragment;
    "Curve_frxETH_ETH_POOL_ADDRESS()": FunctionFragment;
    "Curve_frxETH_ETH_POOL_LP_TOKEN_ADDRESS()": FunctionFragment;
    "Curve_frxETH_ETH_POOL_TOKEN_INDEX_ETH()": FunctionFragment;
    "Curve_frxETH_ETH_POOL_TOKEN_INDEX_frxETH()": FunctionFragment;
    "Curve_stETH_ETH_POOL_ADDRESS()": FunctionFragment;
    "Curve_stETH_ETH_POOL_LP_TOKEN_ADDRESS()": FunctionFragment;
    "Curve_stETH_ETH_POOL_TOKEN_INDEX_ETH()": FunctionFragment;
    "Curve_stETH_ETH_POOL_TOKEN_INDEX_stETH()": FunctionFragment;
    "DAI()": FunctionFragment;
    "USDC()": FunctionFragment;
    "WETH()": FunctionFragment;
    "aggregator()": FunctionFragment;
    "allPairs(uint256)": FunctionFragment;
    "allPairsLength()": FunctionFragment;
    "allStakings(uint256)": FunctionFragment;
    "allStakingsLength()": FunctionFragment;
    "createPair(address,address)": FunctionFragment;
    "feeTo()": FunctionFragment;
    "feeToSetter()": FunctionFragment;
    "frxETH()": FunctionFragment;
    "frxETHMinter()": FunctionFragment;
    "getPair(address,address)": FunctionFragment;
    "getStaking(address,address)": FunctionFragment;
    "rETH()": FunctionFragment;
    "setFeeTo(address)": FunctionFragment;
    "setFeeToSetter(address)": FunctionFragment;
    "sfrxETH()": FunctionFragment;
    "stETH()": FunctionFragment;
    "wstETH()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "BalancerV2Vault"
      | "BalancerV2_rETH_ETH_POOL_ID"
      | "BalancerV2_wstETH_WETH_POOL_ID"
      | "Curve_frxETH_ETH_POOL_ADDRESS"
      | "Curve_frxETH_ETH_POOL_LP_TOKEN_ADDRESS"
      | "Curve_frxETH_ETH_POOL_TOKEN_INDEX_ETH"
      | "Curve_frxETH_ETH_POOL_TOKEN_INDEX_frxETH"
      | "Curve_stETH_ETH_POOL_ADDRESS"
      | "Curve_stETH_ETH_POOL_LP_TOKEN_ADDRESS"
      | "Curve_stETH_ETH_POOL_TOKEN_INDEX_ETH"
      | "Curve_stETH_ETH_POOL_TOKEN_INDEX_stETH"
      | "DAI"
      | "USDC"
      | "WETH"
      | "aggregator"
      | "allPairs"
      | "allPairsLength"
      | "allStakings"
      | "allStakingsLength"
      | "createPair"
      | "feeTo"
      | "feeToSetter"
      | "frxETH"
      | "frxETHMinter"
      | "getPair"
      | "getStaking"
      | "rETH"
      | "setFeeTo"
      | "setFeeToSetter"
      | "sfrxETH"
      | "stETH"
      | "wstETH"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "BalancerV2Vault",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "BalancerV2_rETH_ETH_POOL_ID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "BalancerV2_wstETH_WETH_POOL_ID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "Curve_frxETH_ETH_POOL_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "Curve_frxETH_ETH_POOL_LP_TOKEN_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "Curve_frxETH_ETH_POOL_TOKEN_INDEX_ETH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "Curve_frxETH_ETH_POOL_TOKEN_INDEX_frxETH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "Curve_stETH_ETH_POOL_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "Curve_stETH_ETH_POOL_LP_TOKEN_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "Curve_stETH_ETH_POOL_TOKEN_INDEX_ETH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "Curve_stETH_ETH_POOL_TOKEN_INDEX_stETH",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "DAI", values?: undefined): string;
  encodeFunctionData(functionFragment: "USDC", values?: undefined): string;
  encodeFunctionData(functionFragment: "WETH", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "aggregator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allPairs",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "allPairsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allStakings",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "allStakingsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createPair",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "feeTo", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "feeToSetter",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "frxETH", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "frxETHMinter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPair",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getStaking",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "rETH", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setFeeTo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeToSetter",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "sfrxETH", values?: undefined): string;
  encodeFunctionData(functionFragment: "stETH", values?: undefined): string;
  encodeFunctionData(functionFragment: "wstETH", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "BalancerV2Vault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "BalancerV2_rETH_ETH_POOL_ID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "BalancerV2_wstETH_WETH_POOL_ID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "Curve_frxETH_ETH_POOL_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "Curve_frxETH_ETH_POOL_LP_TOKEN_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "Curve_frxETH_ETH_POOL_TOKEN_INDEX_ETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "Curve_frxETH_ETH_POOL_TOKEN_INDEX_frxETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "Curve_stETH_ETH_POOL_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "Curve_stETH_ETH_POOL_LP_TOKEN_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "Curve_stETH_ETH_POOL_TOKEN_INDEX_ETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "Curve_stETH_ETH_POOL_TOKEN_INDEX_stETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "DAI", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "USDC", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "WETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "aggregator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allPairs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "allPairsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allStakings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allStakingsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feeToSetter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "frxETH", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "frxETHMinter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getStaking", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setFeeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setFeeToSetter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sfrxETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wstETH", data: BytesLike): Result;

  events: {
    "PairCreated(address,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PairCreated"): EventFragment;
}

export interface PairCreatedEventObject {
  token0: string;
  token1: string;
  pair: string;
  allPairsLength: BigNumber;
}
export type PairCreatedEvent = TypedEvent<
  [string, string, string, BigNumber],
  PairCreatedEventObject
>;

export type PairCreatedEventFilter = TypedEventFilter<PairCreatedEvent>;

export interface Factory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    BalancerV2Vault(overrides?: CallOverrides): Promise<[string]>;

    BalancerV2_rETH_ETH_POOL_ID(overrides?: CallOverrides): Promise<[string]>;

    BalancerV2_wstETH_WETH_POOL_ID(
      overrides?: CallOverrides
    ): Promise<[string]>;

    Curve_frxETH_ETH_POOL_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    Curve_frxETH_ETH_POOL_LP_TOKEN_ADDRESS(
      overrides?: CallOverrides
    ): Promise<[string]>;

    Curve_frxETH_ETH_POOL_TOKEN_INDEX_ETH(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    Curve_frxETH_ETH_POOL_TOKEN_INDEX_frxETH(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    Curve_stETH_ETH_POOL_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    Curve_stETH_ETH_POOL_LP_TOKEN_ADDRESS(
      overrides?: CallOverrides
    ): Promise<[string]>;

    Curve_stETH_ETH_POOL_TOKEN_INDEX_ETH(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    Curve_stETH_ETH_POOL_TOKEN_INDEX_stETH(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    DAI(overrides?: CallOverrides): Promise<[string]>;

    USDC(overrides?: CallOverrides): Promise<[string]>;

    WETH(overrides?: CallOverrides): Promise<[string]>;

    aggregator(overrides?: CallOverrides): Promise<[string]>;

    allPairs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    allPairsLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    allStakings(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    allStakingsLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    createPair(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    feeTo(overrides?: CallOverrides): Promise<[string]>;

    feeToSetter(overrides?: CallOverrides): Promise<[string]>;

    frxETH(overrides?: CallOverrides): Promise<[string]>;

    frxETHMinter(overrides?: CallOverrides): Promise<[string]>;

    getPair(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getStaking(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    rETH(overrides?: CallOverrides): Promise<[string]>;

    setFeeTo(
      _feeTo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFeeToSetter(
      _feeToSetter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sfrxETH(overrides?: CallOverrides): Promise<[string]>;

    stETH(overrides?: CallOverrides): Promise<[string]>;

    wstETH(overrides?: CallOverrides): Promise<[string]>;
  };

  BalancerV2Vault(overrides?: CallOverrides): Promise<string>;

  BalancerV2_rETH_ETH_POOL_ID(overrides?: CallOverrides): Promise<string>;

  BalancerV2_wstETH_WETH_POOL_ID(overrides?: CallOverrides): Promise<string>;

  Curve_frxETH_ETH_POOL_ADDRESS(overrides?: CallOverrides): Promise<string>;

  Curve_frxETH_ETH_POOL_LP_TOKEN_ADDRESS(
    overrides?: CallOverrides
  ): Promise<string>;

  Curve_frxETH_ETH_POOL_TOKEN_INDEX_ETH(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  Curve_frxETH_ETH_POOL_TOKEN_INDEX_frxETH(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  Curve_stETH_ETH_POOL_ADDRESS(overrides?: CallOverrides): Promise<string>;

  Curve_stETH_ETH_POOL_LP_TOKEN_ADDRESS(
    overrides?: CallOverrides
  ): Promise<string>;

  Curve_stETH_ETH_POOL_TOKEN_INDEX_ETH(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  Curve_stETH_ETH_POOL_TOKEN_INDEX_stETH(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  DAI(overrides?: CallOverrides): Promise<string>;

  USDC(overrides?: CallOverrides): Promise<string>;

  WETH(overrides?: CallOverrides): Promise<string>;

  aggregator(overrides?: CallOverrides): Promise<string>;

  allPairs(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

  allStakings(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  allStakingsLength(overrides?: CallOverrides): Promise<BigNumber>;

  createPair(
    tokenA: PromiseOrValue<string>,
    tokenB: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  feeTo(overrides?: CallOverrides): Promise<string>;

  feeToSetter(overrides?: CallOverrides): Promise<string>;

  frxETH(overrides?: CallOverrides): Promise<string>;

  frxETHMinter(overrides?: CallOverrides): Promise<string>;

  getPair(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getStaking(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  rETH(overrides?: CallOverrides): Promise<string>;

  setFeeTo(
    _feeTo: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFeeToSetter(
    _feeToSetter: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sfrxETH(overrides?: CallOverrides): Promise<string>;

  stETH(overrides?: CallOverrides): Promise<string>;

  wstETH(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    BalancerV2Vault(overrides?: CallOverrides): Promise<string>;

    BalancerV2_rETH_ETH_POOL_ID(overrides?: CallOverrides): Promise<string>;

    BalancerV2_wstETH_WETH_POOL_ID(overrides?: CallOverrides): Promise<string>;

    Curve_frxETH_ETH_POOL_ADDRESS(overrides?: CallOverrides): Promise<string>;

    Curve_frxETH_ETH_POOL_LP_TOKEN_ADDRESS(
      overrides?: CallOverrides
    ): Promise<string>;

    Curve_frxETH_ETH_POOL_TOKEN_INDEX_ETH(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    Curve_frxETH_ETH_POOL_TOKEN_INDEX_frxETH(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    Curve_stETH_ETH_POOL_ADDRESS(overrides?: CallOverrides): Promise<string>;

    Curve_stETH_ETH_POOL_LP_TOKEN_ADDRESS(
      overrides?: CallOverrides
    ): Promise<string>;

    Curve_stETH_ETH_POOL_TOKEN_INDEX_ETH(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    Curve_stETH_ETH_POOL_TOKEN_INDEX_stETH(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    DAI(overrides?: CallOverrides): Promise<string>;

    USDC(overrides?: CallOverrides): Promise<string>;

    WETH(overrides?: CallOverrides): Promise<string>;

    aggregator(overrides?: CallOverrides): Promise<string>;

    allPairs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

    allStakings(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    allStakingsLength(overrides?: CallOverrides): Promise<BigNumber>;

    createPair(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    feeTo(overrides?: CallOverrides): Promise<string>;

    feeToSetter(overrides?: CallOverrides): Promise<string>;

    frxETH(overrides?: CallOverrides): Promise<string>;

    frxETHMinter(overrides?: CallOverrides): Promise<string>;

    getPair(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getStaking(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    rETH(overrides?: CallOverrides): Promise<string>;

    setFeeTo(
      _feeTo: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFeeToSetter(
      _feeToSetter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    sfrxETH(overrides?: CallOverrides): Promise<string>;

    stETH(overrides?: CallOverrides): Promise<string>;

    wstETH(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "PairCreated(address,address,address,uint256)"(
      token0?: PromiseOrValue<string> | null,
      token1?: PromiseOrValue<string> | null,
      pair?: null,
      allPairsLength?: null
    ): PairCreatedEventFilter;
    PairCreated(
      token0?: PromiseOrValue<string> | null,
      token1?: PromiseOrValue<string> | null,
      pair?: null,
      allPairsLength?: null
    ): PairCreatedEventFilter;
  };

  estimateGas: {
    BalancerV2Vault(overrides?: CallOverrides): Promise<BigNumber>;

    BalancerV2_rETH_ETH_POOL_ID(overrides?: CallOverrides): Promise<BigNumber>;

    BalancerV2_wstETH_WETH_POOL_ID(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    Curve_frxETH_ETH_POOL_ADDRESS(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    Curve_frxETH_ETH_POOL_LP_TOKEN_ADDRESS(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    Curve_frxETH_ETH_POOL_TOKEN_INDEX_ETH(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    Curve_frxETH_ETH_POOL_TOKEN_INDEX_frxETH(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    Curve_stETH_ETH_POOL_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    Curve_stETH_ETH_POOL_LP_TOKEN_ADDRESS(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    Curve_stETH_ETH_POOL_TOKEN_INDEX_ETH(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    Curve_stETH_ETH_POOL_TOKEN_INDEX_stETH(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    DAI(overrides?: CallOverrides): Promise<BigNumber>;

    USDC(overrides?: CallOverrides): Promise<BigNumber>;

    WETH(overrides?: CallOverrides): Promise<BigNumber>;

    aggregator(overrides?: CallOverrides): Promise<BigNumber>;

    allPairs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

    allStakings(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    allStakingsLength(overrides?: CallOverrides): Promise<BigNumber>;

    createPair(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    feeTo(overrides?: CallOverrides): Promise<BigNumber>;

    feeToSetter(overrides?: CallOverrides): Promise<BigNumber>;

    frxETH(overrides?: CallOverrides): Promise<BigNumber>;

    frxETHMinter(overrides?: CallOverrides): Promise<BigNumber>;

    getPair(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStaking(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rETH(overrides?: CallOverrides): Promise<BigNumber>;

    setFeeTo(
      _feeTo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFeeToSetter(
      _feeToSetter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sfrxETH(overrides?: CallOverrides): Promise<BigNumber>;

    stETH(overrides?: CallOverrides): Promise<BigNumber>;

    wstETH(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    BalancerV2Vault(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    BalancerV2_rETH_ETH_POOL_ID(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    BalancerV2_wstETH_WETH_POOL_ID(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    Curve_frxETH_ETH_POOL_ADDRESS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    Curve_frxETH_ETH_POOL_LP_TOKEN_ADDRESS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    Curve_frxETH_ETH_POOL_TOKEN_INDEX_ETH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    Curve_frxETH_ETH_POOL_TOKEN_INDEX_frxETH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    Curve_stETH_ETH_POOL_ADDRESS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    Curve_stETH_ETH_POOL_LP_TOKEN_ADDRESS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    Curve_stETH_ETH_POOL_TOKEN_INDEX_ETH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    Curve_stETH_ETH_POOL_TOKEN_INDEX_stETH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    DAI(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    USDC(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    aggregator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allPairs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allPairsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allStakings(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allStakingsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createPair(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    feeTo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeToSetter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    frxETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    frxETHMinter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPair(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStaking(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setFeeTo(
      _feeTo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFeeToSetter(
      _feeToSetter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sfrxETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wstETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
