import classes from "./CartButton.module.css";

import { useDispatch } from "react-redux";

import { uiAction } from "../store/ui-slice";

import { useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const shoppingCartHandler = () => {
    dispatch(uiAction.toggle());
  };
  return (
    <button className={classes.button} onClick={shoppingCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
