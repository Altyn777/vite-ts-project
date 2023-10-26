import { useState, ChangeEvent } from "react";

import { useBasketProducts } from "../basketProductsContext";

export const Basket = () => {
  const { basketProducts, setBasketProducts } = useBasketProducts();
  const [checkedProducts, setCheckedProducts] = useState<string[]>([]);

  const onCheck = (e: ChangeEvent<HTMLInputElement>, title: string) => {
    const isChecked = !e.target.checked;
    const newCheckedProducts = isChecked
      ? checkedProducts.filter((product) => product !== title)
      : [...checkedProducts, title];
    setCheckedProducts(newCheckedProducts);
  };

  const onRemove = () => {
    setBasketProducts(
      basketProducts.filter(({ title }) => !checkedProducts.includes(title))
    );
    setCheckedProducts([]);
  };

  return (
    <div className="flex-1 p-2 bg-red-100">
      <div className="inline-flex p-2 space-x-3">
        <h2>Basket</h2>
        <button onClick={onRemove} className="focus:outline-none px-2 py-1">
          Remove
        </button>
      </div>
      <ul>
        {basketProducts.map(({ title, count }, i) => (
          <li key={"b" + i} className="flex hover:bg-red-200">
            <label className="flex-1 flex p-2 justify-between items-center">
              <span>Count: {count}</span>
              <span>{title}</span>
              <input
                type="checkbox"
                id={"ib" + i}
                name={title}
                value={title}
                className="w-4 h-4"
                checked={checkedProducts.includes(title)}
                onChange={(e) => onCheck(e, title)}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
