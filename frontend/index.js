import React from "react";
import ReactDOM from "react-dom";
import Index from "./components/Index.jsx";

const wrapper = document.getElementById("main");
wrapper ? ReactDOM.render(<Index />, wrapper) : false;
