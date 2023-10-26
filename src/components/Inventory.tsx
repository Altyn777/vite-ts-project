import { useEffect, useState, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/products";
import { useBasketProducts } from "../basketProductsContext";

import { AddProductModal } from "./AddProductModal";

export const Inventory = () => {
  const [clientProducts, setClientProducts] = useState<string[]>([]);
  const [checkedProducts, setCheckedProducts] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { basketProducts, setBasketProducts } = useBasketProducts();

  const {
    data = { products: [] },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useEffect(() => {
    // document.cookie = `productTitles=;`;
    const existingTitles = document.cookie.replace(
      /(?:(?:^|.*;\s*)productTitles\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const titlesArray = existingTitles ? existingTitles.split(",") : [];
    setClientProducts(titlesArray);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (title: string) => {
    const newProducts = [...clientProducts, title];
    setClientProducts(newProducts);
    const updatedTitles = newProducts.join(",");
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    const expires = expirationDate.toUTCString();
    document.cookie = `productTitles=${updatedTitles}; expires=${expires}; path=/`;
  };

  const onCheck = (e: ChangeEvent<HTMLInputElement>, title: string) => {
    const isChecked = !e.target.checked;
    const newCheckedProducts = isChecked
      ? checkedProducts.filter((product) => product !== title)
      : [...checkedProducts, title];
    setCheckedProducts(newCheckedProducts);
  };

  const onAddToBasket = () => {
    const newBasketProducts = [...basketProducts];
    checkedProducts.forEach((productTitle) => {
      const existingProductIndex = basketProducts.findIndex(
        (p) => p.title === productTitle
      );
      if (existingProductIndex === -1) {
        newBasketProducts.push({ title: productTitle, count: 1 });
      } else {
        newBasketProducts[existingProductIndex].count += 1;
      }
    });
    setBasketProducts(newBasketProducts);
    setCheckedProducts([]);
  };

  return (
    <div className="flex-1 p-2 bg-blue-100">
      <div className="inline-flex p-2 space-x-3">
        <h2>Inventory</h2>
        <button onClick={openModal} className="focus:outline-none px-2 py-1">
          New
        </button>
        <button
          onClick={onAddToBasket}
          className="focus:outline-none px-2 py-1"
        >
          Add
        </button>
      </div>
      <ul>
        {isLoading && <li>isLoading...</li>}
        {data.products.map(({ id, title }) => (
          <li key={id} className="flex hover:bg-blue-200 hover:cursor-pointer">
            <label className="flex-1 flex p-2 justify-between items-center">
              <span>{title}</span>
              <input
                type="checkbox"
                name={title}
                value={title}
                className="w-4 h-4"
                checked={checkedProducts.includes(title)}
                onChange={(e) => onCheck(e, title)}
              />
            </label>
          </li>
        ))}
        {clientProducts.map((clientProduct, i) => (
          <li key={"c" + i} className="flex hover:bg-blue-200">
            <label className="flex-1 flex p-2 justify-between items-center">
              <span>{clientProduct}</span>
              <input
                type="checkbox"
                name={clientProduct}
                value={clientProduct}
                className="w-4 h-4"
                checked={checkedProducts.includes(clientProduct)}
                onChange={(e) => onCheck(e, clientProduct)}
              />
            </label>
          </li>
        ))}
        {isError && <li>Error: can't get data from server</li>}
      </ul>
      {isModalOpen &&
        createPortal(
          <AddProductModal onClose={closeModal} onSubmit={onSubmit} />,
          document.body
        )}
    </div>
  );
};
