import React, { useState, useEffect } from "react";
import "primeflex/primeflex.css";
import "primereact/resources/themes/vela-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import PrimeReact from "primereact/api";
import { Sidebar } from "primereact/sidebar";
import convert from "react-from-dom";
import useMouse from "./components/hook/useMouse";
import makerjs from "makerjs";
import logo from "./logo.svg";
import { Button } from "primereact/button";

PrimeReact.ripple = true;

function App() {
  const [count, setCount] = useState(1);
  const { x, y, handleMouseMove } = useMouse();
  var model = {
    paths: {
      line1: new makerjs.paths.Line([0, 0], [x, y]),
      line2: new makerjs.paths.Line([2, 10], [50, 2]),
    },
  };

  var int = makerjs.path.intersection(model.paths.line1, model.paths.line2);

  if (int) {
    var p = int.intersectionPoints[0];
    var id = JSON.stringify(makerjs.point.rounded(p, 0.01));
    model.paths[id] = new makerjs.paths.Circle(p, 1);
  }
  var svg = makerjs.exporter.toSVG(model, {
    useSvgPathOnly: false,
  });
  let csvg = convert(svg);
  console.log({ svg });
  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <h1>
        The current mouse position is ({x}, {y})
      </h1>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Igor</p>
        <Button
          label="Click"
          className="p-button-outlined  p-button-secondary p-button-lg "
        />

        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>

      <svg xmlns="http://www.w3.org/2000/svg" onMouseMove={handleMouseMove}>
        <line x1="0" y1="50" x2={x} y2={y} stroke="red" strokeWidth="3"></line>
        <path stroke="red" d={`M 0,10 h${x}`} pathLength="90" strokeWidth="3" />
        {csvg}
      </svg>
      {svg}
    </div>
  );
}

export default App;
