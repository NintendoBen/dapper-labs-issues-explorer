import React from "react";
import ReactDOM from "react-dom";
import Application from "./components/Application";
import "./index.css";

const element = document.createElement("div");
element.setAttribute("id", "root");

document.body.append(element);

ReactDOM.render(<Application />, element);
