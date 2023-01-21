import ReactRouter from "./components/Router/Router";
import { CartProvider } from "./components/ShoppingCart/CartContext";

const App = () => {
  return (
    <CartProvider>
      <ReactRouter />
    </CartProvider>
  );
}

export default App;
