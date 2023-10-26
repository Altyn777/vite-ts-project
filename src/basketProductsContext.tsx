import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface BasketProduct {
  title: string;
  count: number;
}

interface BasketProductsContextType {
  basketProducts: BasketProduct[];
  setBasketProducts: Dispatch<SetStateAction<BasketProduct[]>>;
}

const BasketProductsContext = createContext<BasketProductsContextType>({
  basketProducts: [],
  setBasketProducts: () => null,
});

export const useBasketProducts = () => {
  return useContext(BasketProductsContext);
};

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basketProducts, setBasketProducts] = useState<BasketProduct[]>([]);

  const contextValue: BasketProductsContextType = {
    basketProducts,
    setBasketProducts,
  };

  return (
    <BasketProductsContext.Provider value={contextValue}>
      {children}
    </BasketProductsContext.Provider>
  );
};
