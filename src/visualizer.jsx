import React from "react";
import sizeMe from 'react-sizeme'
import * as d3 from "d3"

const
  // バーの数
  NUMBER_OF_LINES = 96,

  // バー間のすきま
  BAR_MARGIN = 1,

  // バーの色
  BAR_COLOR = '#b13c2f'

;

class Visualizer extends React.Component {

  constructor(props) {
    super(props);
    this.createVisualizer = this.createVisualizer.bind(this);
    this.updateVisualizer = this.updateVisualizer.bind(this);
    this.loop = this.loop.bind(this)
  }

  componentDidMount() {
    this.aContext = new window.AudioContext();
    navigator.mediaDevices.getUserMedia({audio: true})
      .then((stream) => {
        let input = this.aContext.createMediaStreamSource(stream),
          analyser = this.aContext.createAnalyser();

        this.analyser = analyser;
        input.connect(analyser);

        this.createVisualizer();
        this.startLoop()
      })
      .catch((error) => {
        console.error('Failed to initialize webkitGetUserMedia', error);
      });
  }

  componentDidUpdate() {
    this.createVisualizer()
  }

  componentWillUnmount() {
    this.stopLoop()
  }

  onSize(size) {
    this.createVisualizer()
  }

  createVisualizer() {
    const _self = this;
    const node = this.node;

    const {width, height} = this.props.size;

    let heightScale = d3.scaleLinear()
        .domain([0, 255])
        .range([0, height])
        .interpolate(d3.interpolateNumber),
      svg = d3.select(node);

    // purge all if not empty
    svg.select('g').remove();

    svg.attr("width", width)
      .attr("height", height);

    this.rect = svg.append('g');
    this.heightScale = heightScale;
    this.sizeWidth = width;
    this.sizeHeight = height
  }

  updateVisualizer() {
    let heightScale = this.heightScale;
    let times = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(times);

    // Uint8Array -> native Array
    let timeArray = [];
    let samplesPerBar = Math.floor(times.length / NUMBER_OF_LINES);
    for (let i = 0; i < times.length; i++) {
      let idx = Math.floor(i / samplesPerBar);
      if (typeof(timeArray[idx]) === 'undefined') {
        timeArray[idx] = 0;
      }
      timeArray[idx] += times[i] / samplesPerBar;
    }

    let width = this.sizeWidth / NUMBER_OF_LINES,
      height = this.sizeHeight,
      rect = this.rect.selectAll('rect').data(timeArray);

    rect.exit().remove();
    rect.enter().append('rect');

    this.rect.selectAll('rect')
      .attr('x', function (d, i) {
        return width * i
      })
      .attr('y', function (d) {
        return (height - heightScale(d));
      })
      .attr('width', Math.ceil(width) - BAR_MARGIN)
      .attr('height', heightScale)
      .style('fill', BAR_COLOR)
  }

  loop() {
    this.updateVisualizer();
    // Set up next iteration of the loop
    this.loopId = window.requestAnimationFrame(this.loop)
  }

  startLoop() {
    if (!this.loopId) {
      this.loopId = window.requestAnimationFrame(this.loop);
    }
  }

  stopLoop() {
    window.cancelAnimationFrame(this.loopId);
    // Note: no need to worry if the loop has already been cancelled
    // cancelAnimationFrame() won't throw an error
  }

  render() {
    return (
      <div className='visualizer'>
        <svg ref={node => this.node = node}/>
      </div>
    )
  }

}

export default sizeMe({monitorHeight: true})(Visualizer)
