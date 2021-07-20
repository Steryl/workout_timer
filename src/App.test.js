import { toSeconds } from "Functions";

test("toSeconds", () => {
  expect(toSeconds({ h: 0, m: 2, s: 30 })).toBe(150);
});
