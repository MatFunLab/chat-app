const expect = require("expect");
const {generateMessage} = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "Matej";
    const text = "hello there!";
    const output = generateMessage(from, text);

    expect(typeof output.createdAt).toBe("number");
    expect(output).toHaveProperty("from");
    expect(output).toHaveProperty("text");

  });
});
