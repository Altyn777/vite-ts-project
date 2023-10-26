import { BasketProduct } from "../basketProductsContext";

export const getBasketItemsCount = (basketProducts: BasketProduct[]) => {
  return basketProducts.reduce(
    (acc: number, item: BasketProduct) => acc + item.count,
    0
  );
};
