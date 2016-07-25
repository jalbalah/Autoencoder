var Autoencoder = React.createClass({
  getInitialState: function(){
    return({
      vUnits: 2,
      hUnits: 3,
      lUnits: 2,
      lvis: 0,  // remove, bad option b/c setState not immediate
      lhid: 0,
      llab: 0
    });
  },
  componentDidMount: function(){
    var vis = [], hid = [], lab = [];
    var c, max;
    var lvis, lhid, llab; // lengths
    for(var c = 0; c < parseInt(this.state.vUnits); c++){ vis.push({id: c, text: c + 1}); }
    for(c2 = c; c < c2 + parseInt(this.state.hUnits); c++){ hid.push({id: c, text: c + 1}); }
    for(c2 = c; c < c2 + parseInt(this.state.lUnits); c++){ lab.push({id: c, text: c + 1}); }
    lvis = vis.length; lhid = hid.length; llab = lab.length;
    this.setState({lvis: vis.length, lhid: hid.length, llab: lab.length});
  },
  updateHid: function(){
    var sum = 0.;
    var vunit = [], hunit = [], weight;
    // find elems from html DOM (slow)
    for(var c = 0; c < parseInt(this.state.vUnits); c++){
      vunit.push(document.getElementById("unit"+c));
    }
    for(var c = parseInt(this.state.vUnits); c < parseInt(this.state.vUnits)+parseInt(this.state.hUnits); c++){
      hunit.push(document.getElementById("unit"+c));
    }
    // main sum of w*x over units in input layer
    for(var c = 0; c < parseInt(this.state.hUnits); c++){
      console.log("hunit["+c+"]: "+hunit[c]);
      weight = hunit[c].getAttribute("title").substring(9).split(",");
      for(var c2 = 0; c2 < weight.length; c2 ++){
        sum += parseInt(weight[c2]) * parseInt(vunit[c2].getAttribute("value"));
        console.log(weight[c2]);
        console.log(vunit[c2].getAttribute("value"));
        console.log("sum(hid="+c+",vis="+c2+"):"+sum);
      }
      if(sum >= Math.random() && hunit[c].getAttribute("value") == "0"){
        hunit[c].click();
        console.log(hunit[c]);
      }else if(sum < Math.random() && hunit[c].getAttribute("value") == "1"){
        hunit[c].click();
      }
    }
  },
  setVUnits: function(event){ this.setState({vUnits: event.target.value}); },
  setHUnits: function(event){ this.setState({hUnits: event.target.value}); },
  setLUnits: function(event){ this.setState({lUnits: event.target.value}); },
  render: function(){
    var vis = [], hid = [], lab = [];
    var c, max;
    var lvis, lhid, llab; // lengths
    for(var c = 0; c < parseInt(this.state.vUnits); c++){ vis.push({id: c, text: c + 1}); }
    for(c2 = c; c < c2 + parseInt(this.state.hUnits); c++){ hid.push({id: c, text: c + 1}); }
    for(c2 = c; c < c2 + parseInt(this.state.lUnits); c++){ lab.push({id: c, text: c + 1}); }
    lvis = vis.length; lhid = hid.length; llab = lab.length;
    var genRange = function(start, end){
      var r = [];
      for(var c=start;c<end;c++){ r.push([1.00]); } //r.push([c, 1.00]);
      return r;
    }
    // Layer: @param, layer name, layer clickFunc, unit initialVal, num. units, " in, 0/1/2==v/h/l
    var layer = function(name, clickFunc, value, size, sizeIn, type){
      this.style = {color:'blue', border:'1px solid'};
      this.name = name; this.clickFunc = clickFunc; this.value = value; this.type = type;
      this.arr = []; this.size = parseInt(size); this.sizeIn = parseInt(sizeIn); 
      this.getLay = function(){
        return({
          name: this.name, clickFunc: this.clickFunc, style: this.style,
          value: this.value, arr: this.arr, type: this.type,
          size: this.size, sizeIn: this.sizeIn, id: 0
        });
      }
      for(var c = NUM_UNITS; c < NUM_UNITS + parseInt(size); c++){ this.arr.push({id: c, text: c + 1}); }
      console.log("this.arr"+this.arr.toString());
      NUM_UNITS += parseInt(size);
    };
    var lay0 = new layer("Visible Layer: ", this.updateHid, "1", this.state.vUnits); // remove soon
    //console.log(lay0);
    var NUM_UNITS = 0;
    var lay1 = (new layer("Visible Layer: ", this.updateHid, "1", this.state.vUnits, 0, 0)).getLay();
    console.log("NU:"+NUM_UNITS);
    var lay2 = (new layer("Hidden Layer: ", this.updateHid, "0", this.state.hUnits, this.state.vUnits, 1)).getLay();
    //console.log(NUM_UNITS);
    var lay3 = (new layer("Label Layer: ", this.updateHid, "0", this.state.lUnits, this.state.hUnits, 2)).getLay();
    var layers = [lay1, lay2, lay3];
    return(
      <div>
        <table>
          <tr>
            <td>Visible units: <input value={this.state.vUnits} onChange={this.setVUnits} type="text"></input></td>
            <td>Hidden units: <input value={this.state.hUnits} onChange={this.setHUnits} type="text"></input></td>
            <td>Label units: <input value={this.state.lUnits} onChange={this.setLUnits} type="text"></input></td>
          </tr>
        </table>
        <br/>
        <div style={{backgroundColor: '#ddd'}}>
        <table>
          {layers.map(function(layer) {
            return (<tr>
              <td>{layer.name}<br/><a onClick={layer.clickFunc} style={layer.style}><i>Propagate </i><img src="arrow.png" /></a></td>
              {layer.arr.map(function(unit) { console.log("laySize:"+layer.size);//console.log(genRange(layer.sizeIn, layer.size));
                //return <Unit value={layer.value} id={"unit"+layer.id} text={layer.text} key={layer.id}>{unit.text}</Unit>;
                return <Unit weights={genRange(0, layer.sizeIn)} value={layer.value} id={"unit"+unit.id} text={unit.text}>{unit.text}</Unit>;
              })}</tr>);
          })}
        </table>
        </div>
        <svg height="210" width="500px">
          <line x1={0} y1={0} x2={500} y2={500} className="line" />
          Sorry, browser does not support inline SVG.
        </svg>
      </div>
    );
  },
});
var Unit = React.createClass({
  unitClicked: function(){
    if(this.props.value == 0)
      this.props.value = 1;
    else
       this.props.value = 0;
     this.forceUpdate();
  },
  render: function(){
    var weights = [];
    if(this.props.weights != undefined) weights = this.props.weights;
    return(
      <td onClick={this.unitClicked} title={"weights: "+weights} value={this.props.value} id={this.props.id} 
          className={"unit"} style={{backgroundColor:'rgb(238,238,'+(255-255*this.props.value)+')',color:'black'}} key={this.props.key}>
        Unit: {this.props.text}<br/>
        Value: {this.props.value}
      </td>
    );
  }
});
var Graph = React.createClass({
  componentDidMount: function() {
    this.draw("x,y","(x,y):",[-20,-15,-15,-10,-5,0,5,10,15,20],[-40,-30,-20,-20,-10,0,10,20,30,40]);
  },
  render: function(){
    return(
      <div>
        <div id="chart_div"></div>
      </div>
    );
  },
  draw: function(xtitle,ytitle,xarr,yarr){
    var pts = [[xtitle,ytitle]];
    for(p = 0; p < xarr.length; p++){
      pts.push( [ xarr[p], yarr[p] ] );
    }
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(pts);
      var options = {
        title: 'Test Data:',
        //hAxis: {title: 'Age', minValue: 0, maxValue: 15},
        //vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
        legend: 'none',
        backgroundColor: '#eee',
      };
      var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  }
});
ReactDOM.render(
  <div>
    <Autoencoder />
  </div>,
  document.getElementById('content')
);