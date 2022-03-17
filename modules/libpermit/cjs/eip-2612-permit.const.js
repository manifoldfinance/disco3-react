"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMAIN_SEPARATOR_ABI = exports.PERMIT_TYPEHASH_ABI = exports.DOMAIN_TYPEHASH_ABI = exports.DAI_EIP_2612_PERMIT_INPUTS = exports.DAI_EIP_2612_PERMIT_ABI = exports.EIP_2612_PERMIT_INPUTS = exports.EIP_2612_PERMIT_ABI = exports.ERC_20_NONCES_ABI = exports.daiPermitModelFields = exports.eip2612PermitModelFields = exports.DAI_LIKE_PERMIT_TYPEHASH = exports.DOMAINS_WITHOUT_VERSION = exports.DAI_PERMIT_SELECTOR = exports.EIP_2612_PERMIT_SELECTOR = void 0;
exports.EIP_2612_PERMIT_SELECTOR = '0xd505accf';
exports.DAI_PERMIT_SELECTOR = '0x8fcbaf0c';
exports.DOMAINS_WITHOUT_VERSION = [
    // 'EIP712Domain(string name,uint chainId,address verifyingContract)'
    '0x797cfab58fcb15f590eb8e4252d5c228ff88f94f907e119e80c4393a946e8f35',
    // 'EIP712Domain(string name,uint256 chainId,address verifyingContract)'
    '0x8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a866',
];
exports.DAI_LIKE_PERMIT_TYPEHASH = '0xea2aa0a1be11a07ed86d755c93467f4f82362b452371d1ba94d1715123511acb';
exports.eip2612PermitModelFields = [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
];
exports.daiPermitModelFields = [
    { name: 'holder', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'nonce', type: 'uint256' },
    { name: 'expiry', type: 'uint256' },
    { name: 'allowed', type: 'bool' },
];
exports.ERC_20_NONCES_ABI = [
    {
        constant: true,
        inputs: [
            {
                name: '',
                type: 'address',
            },
        ],
        name: 'nonces',
        outputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                name: '',
                type: 'address',
            },
        ],
        name: '_nonces',
        outputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
];
exports.EIP_2612_PERMIT_ABI = [
    {
        constant: false,
        inputs: [
            {
                name: 'owner',
                type: 'address',
            },
            {
                name: 'spender',
                type: 'address',
            },
            {
                name: 'value',
                type: 'uint256',
            },
            {
                name: 'deadline',
                type: 'uint256',
            },
            {
                name: 'v',
                type: 'uint8',
            },
            {
                name: 'r',
                type: 'bytes32',
            },
            {
                name: 's',
                type: 'bytes32',
            },
        ],
        name: 'permit',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
exports.EIP_2612_PERMIT_INPUTS = exports.EIP_2612_PERMIT_ABI[0].inputs;
exports.DAI_EIP_2612_PERMIT_ABI = [
    {
        constant: false,
        inputs: [
            {
                internalType: 'address',
                name: 'holder',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'spender',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'nonce',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'expiry',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'allowed',
                type: 'bool',
            },
            {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
            },
            {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
            },
            {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
            },
        ],
        name: 'permit',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
exports.DAI_EIP_2612_PERMIT_INPUTS = exports.DAI_EIP_2612_PERMIT_ABI[0].inputs;
exports.DOMAIN_TYPEHASH_ABI = [
    {
        constant: true,
        inputs: [],
        name: 'DOMAIN_TYPEHASH',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
];
exports.PERMIT_TYPEHASH_ABI = [
    {
        constant: true,
        inputs: [],
        name: 'PERMIT_TYPEHASH',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
];
exports.DOMAIN_SEPARATOR_ABI = [
    {
        inputs: [],
        name: 'DOMAIN_SEPARATOR',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
//# sourceMappingURL=eip-2612-permit.const.js.map