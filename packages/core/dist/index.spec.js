"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const types_1 = require("@disco3/types");
const _1 = require(".");
class MockConnector extends types_1.Connector {
    constructor(actions) {
        super(actions);
    }
    activate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.actions.startActivation();
        });
    }
    update(...args) {
        this.actions.update(...args);
    }
    reportError(...args) {
        this.actions.reportError(...args);
    }
}
describe('#initializeConnector', () => {
    let connector;
    let hooks;
    beforeEach(() => {
        [connector, hooks] = (0, _1.initializeConnector)((actions) => new MockConnector(actions));
    });
    test('#useChainId', () => {
        let { result: { current: chainId }, } = (0, react_hooks_1.renderHook)(() => hooks.useChainId());
        expect(chainId).toBe(undefined);
        (0, react_hooks_1.act)(() => connector.update({ chainId: 1 }));
        ({
            result: { current: chainId },
        } = (0, react_hooks_1.renderHook)(() => hooks.useChainId()));
        expect(chainId).toBe(1);
    });
    describe('#useAccounts', () => {
        test('empty', () => __awaiter(void 0, void 0, void 0, function* () {
            let { result: { current: accounts }, } = (0, react_hooks_1.renderHook)(() => hooks.useAccounts());
            expect(accounts).toBe(undefined);
            (0, react_hooks_1.act)(() => connector.update({ accounts: [] }));
            ({
                result: { current: accounts },
            } = (0, react_hooks_1.renderHook)(() => hooks.useAccounts()));
            expect(accounts).toEqual([]);
        }));
        test('single', () => {
            let { result: { current: accounts }, } = (0, react_hooks_1.renderHook)(() => hooks.useAccounts());
            expect(accounts).toBe(undefined);
            (0, react_hooks_1.act)(() => connector.update({ accounts: ['0x0000000000000000000000000000000000000000'] }));
            ({
                result: { current: accounts },
            } = (0, react_hooks_1.renderHook)(() => hooks.useAccounts()));
            expect(accounts).toEqual(['0x0000000000000000000000000000000000000000']);
        });
        test('multiple', () => {
            let { result: { current: accounts }, } = (0, react_hooks_1.renderHook)(() => hooks.useAccounts());
            expect(accounts).toBe(undefined);
            (0, react_hooks_1.act)(() => connector.update({
                accounts: [
                    '0x0000000000000000000000000000000000000000',
                    '0x0000000000000000000000000000000000000001',
                ],
            }));
            ({
                result: { current: accounts },
            } = (0, react_hooks_1.renderHook)(() => hooks.useAccounts()));
            expect(accounts).toEqual([
                '0x0000000000000000000000000000000000000000',
                '0x0000000000000000000000000000000000000001',
            ]);
        });
    });
    test('#useIsActivating', () => __awaiter(void 0, void 0, void 0, function* () {
        let { result: { current: activating }, } = (0, react_hooks_1.renderHook)(() => hooks.useIsActivating());
        expect(activating).toBe(false);
        yield (0, react_hooks_1.act)(() => connector.activate());
        ({
            result: { current: activating },
        } = (0, react_hooks_1.renderHook)(() => hooks.useIsActivating()));
        expect(activating).toEqual(true);
    }));
    test('#useError', () => {
        let { result: { current: error }, } = (0, react_hooks_1.renderHook)(() => hooks.useError());
        expect(error).toBe(undefined);
        (0, react_hooks_1.act)(() => connector.reportError(new Error()));
        ({
            result: { current: error },
        } = (0, react_hooks_1.renderHook)(() => hooks.useError()));
        expect(error).toBeInstanceOf(Error);
    });
});
