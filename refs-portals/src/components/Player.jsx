import { useState, useRef } from "react";
export default function Player() {
  const input = useRef();
  const [entityPlayerName, setEntityPlayerName] = useState("");
  // const [submitted, setSubmitted] = useState(false);

  // function handleChange(event) {
  //   setEntityPlayerName(event.target.value);
  //   setSubmitted(false);
  // }

  function handleClick() {
    setEntityPlayerName(input.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {entityPlayerName ? entityPlayerName : "Unknow entity"}</h2>
      <p>
        <input ref={input} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
