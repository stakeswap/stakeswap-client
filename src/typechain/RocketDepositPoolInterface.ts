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
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface RocketDepositPoolInterfaceInterface extends utils.Interface {
  functions: {
    "assignDeposits()": FunctionFragment;
    "deposit()": FunctionFragment;
    "getBalance()": FunctionFragment;
    "getExcessBalance()": FunctionFragment;
    "recycleDissolvedDeposit()": FunctionFragment;
    "recycleExcessCollateral()": FunctionFragment;
    "recycleLiquidatedStake()": FunctionFragment;
    "withdrawExcessBalance(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "assignDeposits"
      | "deposit"
      | "getBalance"
      | "getExcessBalance"
      | "recycleDissolvedDeposit"
      | "recycleExcessCollateral"
      | "recycleLiquidatedStake"
      | "withdrawExcessBalance"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "assignDeposits",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getExcessBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "recycleDissolvedDeposit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "recycleExcessCollateral",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "recycleLiquidatedStake",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawExcessBalance",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "assignDeposits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getExcessBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recycleDissolvedDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recycleExcessCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recycleLiquidatedStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawExcessBalance",
    data: BytesLike
  ): Result;

  events: {};
}

export interface RocketDepositPoolInterface extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RocketDepositPoolInterfaceInterface;

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
    assignDeposits(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deposit(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    getExcessBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    recycleDissolvedDeposit(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    recycleExcessCollateral(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    recycleLiquidatedStake(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawExcessBalance(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  assignDeposits(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deposit(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getBalance(overrides?: CallOverrides): Promise<BigNumber>;

  getExcessBalance(overrides?: CallOverrides): Promise<BigNumber>;

  recycleDissolvedDeposit(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  recycleExcessCollateral(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  recycleLiquidatedStake(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawExcessBalance(
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    assignDeposits(overrides?: CallOverrides): Promise<void>;

    deposit(overrides?: CallOverrides): Promise<void>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getExcessBalance(overrides?: CallOverrides): Promise<BigNumber>;

    recycleDissolvedDeposit(overrides?: CallOverrides): Promise<void>;

    recycleExcessCollateral(overrides?: CallOverrides): Promise<void>;

    recycleLiquidatedStake(overrides?: CallOverrides): Promise<void>;

    withdrawExcessBalance(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    assignDeposits(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deposit(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getExcessBalance(overrides?: CallOverrides): Promise<BigNumber>;

    recycleDissolvedDeposit(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    recycleExcessCollateral(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    recycleLiquidatedStake(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawExcessBalance(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    assignDeposits(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getExcessBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    recycleDissolvedDeposit(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    recycleExcessCollateral(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    recycleLiquidatedStake(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawExcessBalance(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
