import { useRef, useState } from "react";
import Modal from "./Modal";

export default function NewTask({ onAdd }) {
  const [enteredText, setEnteredText] = useState("");
  const modal = useRef();

  function handleChange(event) {
    setEnteredText(event.target.value);
  }

  function handleSubmit() {
    if (enteredText.trim() === "") {
      modal.current.open();
      return;
    }
    onAdd(enteredText);
    setEnteredText("");
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okey">
        <h2 className="text-xl font-bold text-stone-700 my-4">
          Invalid Inputs
        </h2>
        <p className="text-stone-600 mb-4">
          Opps... look like you forgot to enter values
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every inout field
        </p>
      </Modal>
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          onChange={handleChange}
          value={enteredText}
        />
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={handleSubmit}
        >
          {" "}
          Add Task
        </button>
      </div>
    </>
  );
}
