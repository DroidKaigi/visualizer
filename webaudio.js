var context = new window.AudioContext();

function LibCodingSoVisualizer() {
  var boundingClientRect = d3.select('#vis').node().getBoundingClientRect();
  this.constant = {
    WIDTH: boundingClientRect.width,
    HEIGHT: boundingClientRect.height
  };

  this.onStream = function (stream) {
    var input = context.createMediaStreamSource(stream);
    var analyser = context.createAnalyser();

    this.analyser = analyser;
    input.connect(analyser);

    var domain = [0, 255];
    var heightScale = d3.scale.linear()
      .domain(domain)
      .range([0, this.constant.HEIGHT])
      .interpolate(d3.interpolateNumber);

    var svg = d3.select("#vis").append("svg")
      .attr("width", this.constant.WIDTH)
      .attr("height", this.constant.HEIGHT);

    this.rect = svg.append('g');
    this.heightScale = heightScale;

    window.requestAnimationFrame(this.visualize.bind(this));
  };

  this.onStreamError = function (e) {
    console.error('Error getting mic', e);
  };

  this.timeArray = [];

  this.visualize = function () {
    var LINE_NUM = 128;

    var heightScale = this.heightScale;

    var times = new Uint8Array(this.analyser.frequencyBinCount);
    // this.analyser.getByteTimeDomainData(times);
    this.analyser.getByteFrequencyData(times);

    // UInt8Array -> JavaScript array
    this.timeArray = [];
    var length = parseInt(times.length);
    for (var i = 0; i < length; i++) {
      var idx = parseInt(i / (length / LINE_NUM));
      if (typeof(this.timeArray[idx]) === 'undefined') {
        this.timeArray[idx] = 0;
      }
      this.timeArray[idx] += times[i] / (length / LINE_NUM);
    }

    var width = this.constant.WIDTH / LINE_NUM;
    var height = this.constant.HEIGHT;

    var rect = this.rect.selectAll('rect').data(this.timeArray);
    rect.exit().remove();
    rect.enter().append('rect');

    this.rect.selectAll('rect')
      .attr('x', function (d, i) {
        return width * i
      })
      .attr('y', function(d){
        return (height - heightScale(d)) / 2;
      })
      .attr('width', Math.ceil(width))
      .attr('height', heightScale)
      .style('fill', '#65d7e5') // バーの色を変えたいときはここ
    ;

    window.requestAnimationFrame(this.visualize.bind(this));
  };

  this.getMicInput = function () {
    navigator.webkitGetUserMedia(
      {audio: true},
      this.onStream.bind(this),
      this.onStreamError.bind(this)
    );
  };
  this.getMicInput();
}

