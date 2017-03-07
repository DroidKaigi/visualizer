var context = new window.AudioContext();

function LibCodingSoVisualizer() {
  this.constant = {
    WIDTH: (window.innerWidth < 300) ? 640 : window.innerWidth,
    HEIGHT: (window.innerHeight < 300) ? 480 : window.innerHeight
  };

  this.setFilter = function (filter) {
    /* @see http://www.g200kg.com/jp/docs/webaudio/filter.html */
    // フィルタのタイプ
    filter.type = filter.NOTCH;
    // フィルタの周波数
    filter.frequency.value = 1000.0;
    // フィルタのQ（適用範囲）
    filter.Q = 100.0;
  };

  this.onStream = function (stream) {
    var input = context.createMediaStreamSource(stream);
    // var filter = context.createBiquadFilter();
    var analyser = context.createAnalyser();

    this.analyser = analyser;
    // this.filter = filter;

    // this.setFilter(filter);

    // input.connect(filter);
    // filter.connect(analyser);

    input.connect(analyser);

    var domain = [0, 255];

    var color = d3.scale.linear()
      .domain(domain)
      .range(["#FFFFFF", "#0000FF"])
      .interpolate(d3.interpolateLab);

    var opacity = d3.scale.linear()
      .domain(domain)
      .range([0.0, 1.0])
      .interpolate(d3.interpolateNumber);

    var heightScale = d3.scale.linear()
      .domain(domain)
      .range([0, this.constant.HEIGHT])
      .interpolate(d3.interpolateNumber);

    var svg = d3.select("#vis").append("svg")
      .attr("width", this.constant.WIDTH)
      .attr("height", this.constant.HEIGHT);

    var rect = svg.append('g');

    //var numa = d3.select("body").append("img").attr("src", "./numa.jpg");

    //this.numa = numa;
    this.color = color;
    this.rect = rect;
    this.opacity = opacity;
    this.heightScale = heightScale;

    window.requestAnimationFrame(this.visualize.bind(this));
  };
  this.onStreamError = function (e) {
    console.error('Error getting mic', e);
  };
  this.timeArray = [];

  this.visualize = function () {
    var LINE_NUM = 128;

    //var color = this.color;
    //var opacity = this.opacity;
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
      .attr('width', width)
      .attr('height', heightScale)
      .style('fill', "#01b5c8") // バーの色を変えたいときはここ
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

