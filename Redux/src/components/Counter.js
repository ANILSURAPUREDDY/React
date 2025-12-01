import classes from "./Counter.module.css";

import { useSelector, useDispatch } from "react-redux";
import { counterAction } from "./store/index";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((store) => store.count.counter);
  console.log("count", counter);
  const show = useSelector((store) => store.count.showToggle);

  const incrementHandler = () => {
    console.log("from dispat", counter);
    dispatch(counterAction.increment());
  };

  const increaseHandler = () => {
    dispatch(counterAction.increase(5));
  };

  const decrementHandler = () => {
    dispatch(counterAction.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterAction.toggle());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment By 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
