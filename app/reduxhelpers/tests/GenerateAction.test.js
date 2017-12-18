import generateAction from "../GenerateAction";

// gonna use this File/tests/File.test paradigm for now to reduce clutter in the folder that File is in.
// we'll see if it works out in the long run
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