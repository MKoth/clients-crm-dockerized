import React from "react";
import ReactDOM from "react-dom";
import Widget from "./js/components/Widget";

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Widget />, wrapper) : false;