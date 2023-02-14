import ReactRouter from "./components/Router/Router";
import { CartProvider } from "./components/ShoppingCart/CartContext";
import Chat from "./components/Chat/Chat"
import { useContext } from 'react';
import AuthContext from './store/auth-context';
const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <CartProvider>
      <ReactRouter />
      <Chat context={authCtx}></Chat>
    </CartProvider>
    
  );
}

export default App;
