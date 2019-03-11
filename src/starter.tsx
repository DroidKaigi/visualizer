import * as React from 'react';
import * as ReactDom from "react-dom"
import Visualizer from './visualizer';

export default class Starter extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  onClick(e) {
    var starter = document.getElementsByClassName("starter")[0] as HTMLDivElement;
    var startButton = document.getElementsByClassName("start_button")[0] as HTMLButtonElement;
    starter.style.zIndex = "0";
    starter.style.background = "transparent";
    startButton.style.display = "none";
    var div = document.createElement("div");
    div.className = "visualizer_container";
    starter.appendChild(div);
    ReactDom.render(
      <Visualizer />,
      document.querySelector(".visualizer_container")
    );
  }

  render() {
    return (
      <div className="starter">
        <button className="start_button" onClick={this.onClick}>
          START
        </button>
      </div>
    );
  }
}