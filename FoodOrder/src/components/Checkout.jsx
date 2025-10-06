import { useContext, useActionState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

import Error from "./Error";

import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleClearCart() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3030/orders",
    requestConfig
  );

  const [formState, formAction, pending] = useActionState(handleSubmit, null);

  async function handleSubmit(preForm, formData) {
    // event.preventDefault();
    //const fd = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

    // const { data, isLoading, error } = useHttp(
    //   "http://localhost:3030/orders",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       order: {
    //         items: cartCtx.items,
    //         customer: customerData,
    //       },
    //     }),
    //   },
    //   []
    // );

    // const response = await fetch("http://localhost:3030/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartCtx.items,
    //       customer: customerData,
    //     },
    //   }),
    // });

    // if (!response.ok) {
    //   return;
    // }

    // const resposeData = await response.json();

    // console.log(customerData);
    // console.log(resposeData);
  }

  let action = (
    <>
      {" "}
      <Button textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (pending) {
    action = <span>Sending Request..</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleCloseCheckout}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few mintues.
        </p>
        <p className="modal-actions">
          <Button onClick={handleClearCart}>Okey</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Adress" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit the order" message={error} />}
        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}
