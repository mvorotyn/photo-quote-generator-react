import { registerSW } from "virtual:pwa-register";
import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/app";
import { CssBaseline } from "@mui/material";
import "./index.css";



if ("serviceWorker" in navigator) {
  // && !/localhost/.test(window.location) && !/lvh.me/.test(window.location)) {
  const updateSW = registerSW({
    onNeedRefresh() {
      console.log('sw: need refresh!')
      // TODO
      //store showSnack = true
      // store snackMessage = "need refresh"
      //store run action ( store.workerUpdate())  ()=>{updateSW(true); ...}
      updateSW(true);

    },
    onRegistered(){
      console.log('sw: registered!')
    },
    onOfflineReady(){
      console.log('sw: ready for offline mode!')
    }
  });
}
ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);


// if (!process?.env?.NODE_ENV)  window.process = {env: {NODE_ENV: 'production'}};
