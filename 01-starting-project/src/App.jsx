import { useState } from "react";

import Header from "./components/Header/Header.jsx";
import CoreConcepts from "./components/CorConcepts.jsx";
import Examples from "./components/Examples.jsx";

function App() {
  return (
    <div>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </div>
  );
}

export default App;
