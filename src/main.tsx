import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/app";
// import { CssBaseline } from "@material-ui/core";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <CssBaseline /> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);


// if (!process?.env?.NODE_ENV)  window.process = {env: {NODE_ENV: 'production'}};
