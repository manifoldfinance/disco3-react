import { AbiInput, AbiItem } from 'web3-utils';
import { EIP712Parameter } from './model/eip712.model';
export declare const EIP_2612_PERMIT_SELECTOR = '0xd505accf';
export declare const DAI_PERMIT_SELECTOR = '0x8fcbaf0c';
export declare const DOMAINS_WITHOUT_VERSION: string[];
export declare const DAI_LIKE_PERMIT_TYPEHASH =
  '0xea2aa0a1be11a07ed86d755c93467f4f82362b452371d1ba94d1715123511acb';
export declare const eip2612PermitModelFields: EIP712Parameter[];
export declare const daiPermitModelFields: EIP712Parameter[];
export declare const ERC_20_NONCES_ABI: AbiItem[];
export declare const EIP_2612_PERMIT_ABI: AbiItem[];
export declare const EIP_2612_PERMIT_INPUTS: AbiInput[];
export declare const DAI_EIP_2612_PERMIT_ABI: AbiItem[];
export declare const DAI_EIP_2612_PERMIT_INPUTS: AbiInput[];
export declare const DOMAIN_TYPEHASH_ABI: AbiItem[];
export declare const PERMIT_TYPEHASH_ABI: AbiItem[];
export declare const DOMAIN_SEPARATOR_ABI: AbiItem[];
