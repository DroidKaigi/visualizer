import React from "react";

const INTERVAL = 3 * 1000;

export default class SlideShow extends React.Component {

  constructor(props) {
    super(props);
    this.items = props.items;

    this.state = {
      current: 0
    };
    this.incrementCurrent = this.incrementCurrent.bind(this);

    setInterval(() => {
      this.setState({current: this.incrementCurrent()})
    }, INTERVAL)
  }

  incrementCurrent() {
    var value = this.state.current;
    if (value >= this.items.length) {
      value = 0
    } else {
      value++
    }
    return value
  }

  render() {
    let items = this.items
      .map((item, index) => {
        return <Slide slide={item}
                      index={index + 1}
                      currentIndex={this.state.current}
                      key={index + 1}/>
      });
    items.unshift(<HeadSlide currentIndex={this.state.current}
                             key={0}/>);
    return (
      <div className='slideshow'>
        {items}
      </div>
    )
  }
}

class Slide extends React.Component {

  constructor(props) {
    super(props);
    this.slide = props.slide;
  }

  render() {
    // icon
    let icon = this.slide.t_i
    if (typeof icon === "string") {
      if (icon.match(/fa/)) {
        icon = <i className={`fa ${icon}`}/>
      } else if (icon.match(/zmdi/)) {
        icon = <i className={`zmdi ${icon}`}/>
      } else {
        icon = ""
      }
    }

    let style = {};
    if (this.props.index !== this.props.currentIndex) {
      style.display = 'none'
    }

    return (
      <div style={style}
           className='slide'>
        <h2>
          {icon}
          {/*{(icon !== "" ? " " : "")}*/}
          {/*{this.slide.t}*/}
        </h2>
        <article>
          {this.slide.t === null ? "" : <h3>{this.slide.t}</h3>}
          {this.slide.d}
        </article>
      </div>
    )
  }

}

class HeadSlide extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let style = {};
    if (0 !== this.props.currentIndex) {
      style.display = 'none'
    }

    return (
      <div style={style}
           className='slide'>
        <img src="./logo.png" style={{width: "400px"}}/>
        <img src="./droidkaigi.png" style={{width: "700px"}}/>
      </div>
    )
  }
}
