import { cartActions } from "./cart-slice";
import { uiAction } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiAction.showNotification({
        status: "Pending",
        title: "Sending..",
        message: "Sending data to cart",
      })
    );

    const fetchData = async () => {
      const resp = await fetch(
        "https://hrms-app-2c62c.firebaseio.com/cart.json"
      );
      if (!resp.ok) {
        throw new Error("Could not fetch the Cart data");
      }
      const data = resp.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success",
          message: "Fetch data from cart successful",
        })
      );
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error",
          message: "Fetch data from cart failed",
        })
      );
    }
  };
};

export const sentCartData = (cart) => {
  console.log("sentCartData from cart slice");
  return async (dispatch) => {
    dispatch(
      uiAction.showNotification({
        status: "Pending",
        title: "Sending..",
        message: "Sending data to cart",
      })
    );

    const sentData = async () => {
      const respo = await fetch(
        "https://hrms-app-2c62c.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!respo.ok) {
        throw new Error("error while send cart data");
      }
    };

    try {
      await sentData();
      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success",
          message: "Sent data to cart successful",
        })
      );
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error",
          message: "Sent data to cart failed",
        })
      );
    }
  };
};
