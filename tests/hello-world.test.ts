import { describe, expect, it } from "vitest";
import fetch from "node-fetch";

describe("/", () => {
  it("visiting the '/' endpoint", async () => {
    const result = await fetch("http://localhost:3000").then((response) =>
      response.text()
    );
    expect(result).toBe("Hello World");
  });
});
