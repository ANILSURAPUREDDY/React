import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";

import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userPregressCtx = useContext(UserProgressContext);

  const totalCartItem = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userPregressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo" />
        <h1>Online Food Order</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItem})
        </Button>
      </nav>
    </header>
  );
}
