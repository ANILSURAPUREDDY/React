import Player from "./components/Player.jsx";
import TimerChallenge from "./components/TimerChallange.jsx";

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title={"Easy"} targettime={1} />
        <TimerChallenge title={"Not Easy"} targettime={5} />\
        <TimerChallenge title={"Hard"} targettime={10} />
        <TimerChallenge title={"Pro"} targettime={15} />
      </div>
    </>
  );
}

export default App;
