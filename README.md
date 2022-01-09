<!-- START pkgtoc, keep to allow update -->

**Packages**

| Package                                                | Description                            |
| :----------------------------------------------------- | :------------------------------------- |
| **[@disco3/connect-wallet](packages/connect-wallet/)** | web3modal based react hook for wallets |
| **[@disco3/core](packages/core/)**                     |                                        |
| **[@disco3/eip1193](packages/eip1193/)**               |                                        |
| **[@disco3/frame](packages/frame/)**                   |                                        |
| **[@disco3/magic](packages/magic/)**                   |                                        |
| **[@disco3/metamask](packages/metamask/)**             |                                        |
| **[@disco3/network](packages/network/)**               |                                        |
| **[@disco3/store](packages/store/)**                   |                                        |
| **[@disco3/types](packages/types/)**                   |                                        |
| **[@disco3/walletconnect](packages/walletconnect/)**   |                                        |
| **[@disco3/walletlink](packages/walletlink/)**         |                                        |
| **[tsconfig](packages/tsconfig/)**                     |                                        |

<!-- END pkgtoc, keep to allow update -->

<!-- VERSION 2022.01.04 -->

## [disco3](https://manifoldfinance.com)

> a performant web3 react library

[![build - passing](https://img.shields.io/badge/build-passing-black)](https://)
[![manifoldfinance.eth](https://img.shields.io/static/v1?label=&message=manifoldfinance.eth&color=black&logo=ethereum&logoColor=white)](https://etherscan.io/enslookup-search?search=manifoldfinance.eth)
[![0.8.0](https://img.shields.io/static/v1?label=&message=0.8.0&color=black&logo=solidity&logoColor=white)](https://etherscan.io/enslookup-search?search=manifoldfinance.eth)
[![manifoldfinance - disco3-react](https://img.shields.io/static/v1?label=manifoldfinance&message=disco3-react&color=black&logo=github)](https://github.com/manifoldfinance/disco3-react 'Go to GitHub repo')

### Documentation

- turborepo
- modern state management
- documentation

#### Utilities

This turborepo has some additional tools already setup for you:

### Setup

This repository is used in the `npx create-turbo` command, and selected when choosing which package
manager you wish to use with your Monorepo (Yarn).

#### Build

To build all apps and packages, run the following command:

```sh
turbo run install
```

#### Develop

To develop all apps and packages, run the following command:

```sh
turbo run build
```

[@disco3/store](README.md) / Exports

## @disco3/store

### Table of contents

#### Classes

- [ChainIdNotAllowedError](classes/ChainIdNotAllowedError.md)

#### Functions

- [createWeb3ReactStoreAndActions](modules.md#createweb3reactstoreandactions)

### Functions

#### createWeb3ReactStoreAndActions

▸ **createWeb3ReactStoreAndActions**(`allowedChainIds?`): [`Web3ReactStore`, `Actions`]

##### Parameters

| Name | Type |
| :------ | :------ |
| `allowedChainIds?` | `number`[] |

##### Returns

[`Web3ReactStore`, `Actions`]

##### Defined in

[packages/store/src/index.ts:40](https://github.com/manifoldfinance/disco3-react/blob/dffd9de/packages/store/src/index.ts#L40)
[@disco3/types](README.md) / Exports

## @disco3/types

### Table of contents

#### Classes

- [Connector](classes/Connector.md)

#### Interfaces

- [Actions](interfaces/Actions.md)
- [Provider](interfaces/Provider.md)
- [ProviderConnectInfo](interfaces/ProviderConnectInfo.md)
- [ProviderMessage](interfaces/ProviderMessage.md)
- [ProviderRpcError](interfaces/ProviderRpcError.md)
- [RequestArguments](interfaces/RequestArguments.md)
- [Web3ReactState](interfaces/Web3ReactState.md)
- [Web3ReactStateUpdate](interfaces/Web3ReactStateUpdate.md)

#### Type aliases

- [Web3ReactStore](modules.md#web3reactstore)

### Type aliases

#### Web3ReactStore

Ƭ **Web3ReactStore**: `StoreApi`<[`Web3ReactState`](interfaces/Web3ReactState.md)\>

##### Defined in

[packages/types/src/types.ts:12](https://github.com/manifoldfinance/disco3-react/blob/dffd9de/packages/types/src/types.ts#L12)
[@disco3/eip1193](README.md) / Exports

## @disco3/eip1193

### Table of contents

#### Classes

- [EIP1193](classes/EIP1193.md)

## License

Portions under:
    - GPL-3.0
    - Apache-2.0

See package for more information
