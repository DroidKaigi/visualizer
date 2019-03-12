import * as React from "react"
import { render } from "react-dom"
import App from "./app";
import './index.scss'
import { hot } from "react-hot-loader/root";

const HotApp = hot(App);
render(<HotApp />, document.getElementById("app"));
