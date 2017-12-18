import generateAction from "./GenerateAction";

test("Can generate an action", () => {
    const dispatchMock = jest.fn();
    const generator = generateAction(dispatchMock);

    const t = generator("test_type", "param1");
    t();

    const funct = generator((d) => {
        // do stuff
    });

    funct();

    expect(dispatchMock.mock.calls.length).toBe(2);
})