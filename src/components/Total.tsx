import { useBasketProducts } from "../basketProductsContext";
import { getBasketItemsCount } from "../utils/getBasketItemsCount";

export const Total = () => {
  const { basketProducts } = useBasketProducts();
  const totalCount = getBasketItemsCount(basketProducts);
  return <div className="flex-none p-2 bg-violet-200">Total: {totalCount}</div>;
};
