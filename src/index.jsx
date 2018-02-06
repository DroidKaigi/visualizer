import React from "react"
import ReactDom from "react-dom"
import App from "./app";
import './index.scss'
import {AppContainer} from "react-hot-loader";

const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById("app")
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    render(App)
  });
}
