import { expect, test } from "vitest";

import { getBasketItemsCount } from "./utils/getBasketItemsCount";

test("getBasketItemsCount should correctly get items count", () => {
  expect(
    getBasketItemsCount([
      { title: "first", count: 1 },
      { title: "second", count: 2 },
    ])
  ).toBe(3);
  expect(getBasketItemsCount([])).toBe(0);
});
