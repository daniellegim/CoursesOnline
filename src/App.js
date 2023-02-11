import ReactRouter from "./components/Router/Router";
import { CartProvider } from "./components/ShoppingCart/CartContext";
import Chat from "./components/Chat/Chat"
const App = () => {
  return (
    <CartProvider>
      <ReactRouter />
      <Chat></Chat>
    </CartProvider>
    
  );
}

export default App;
