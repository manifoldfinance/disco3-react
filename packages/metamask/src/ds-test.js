import * as index from "./index"

// @ponicode
describe("index.MetaMask.activate", () => {
    let inst4: any
    let inst3: any
    let inst: any
    let inst2: any

    beforeEach(() => {
        inst4 = new index.MetaMask({ startActivation: () => () => undefined, update: () => undefined, reportError: () => undefined }, false, undefined)
        inst3 = new index.MetaMask({ startActivation: () => () => undefined, update: () => undefined, reportError: () => undefined }, true, undefined)
        inst = new index.MetaMask({ startActivation: () => () => undefined, update: () => undefined, reportError: () => undefined }, false, undefined)
        inst2 = new index.MetaMask({ startActivation: () => () => undefined, update: () => undefined, reportError: () => undefined }, true, undefined)
    })

    test("0", async () => {
        await inst.activate(10.23)
    })

    test("1", async () => {
        await inst2.activate(undefined)
    })

    test("2", async () => {
        let result: any = await inst3.activate(1)
        expect(result).toBe(1)
    })
})
