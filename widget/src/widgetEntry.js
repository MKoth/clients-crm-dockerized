import React from "react";
import ReactDOM from "react-dom";
import Widget from "./js/components/Widget";

export const init = (config) => {
  ReactDOM.render(<Widget {...config}/>, document.getElementById(config.button_container_id));
}