import "./App.css";
import { Basket, Inventory, Total } from "./components";

import { BasketProvider } from "./basketProductsContext";

export function App() {
  return (
    <BasketProvider>
      <div className="flex flex-col h-screen">
        <h1 className="flex-none">Hello!</h1>
        <div className="container">
          <Inventory />
          <Basket />
        </div>
        <Total />
      </div>
    </BasketProvider>
  );
}
