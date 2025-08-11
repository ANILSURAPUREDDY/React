import { useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
export default function ResultModal({
  ref,
  targetTime,
  remainingTime,
  onRest,
}) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formatTimeRemaining = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your Score :{score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped timer at{" "}
        <strong>{formatTimeRemaining} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onRest}>
        <button>Closr</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
