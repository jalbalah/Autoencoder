var Autoencoder = React.createClass({
  getInitialState: function(){
    return({
      vUnits: 2,
      hUnits: 3,
      lUnits: 2,
      lvis: 0,
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
    for(var c = 0; c < parseInt(this.state.vUnits); c++){
      vunit.push(document.getElementById("unit"+c));
    }
    for(var c = parseInt(this.state.vUnits); c < parseInt(this.state.vUnits)+parseInt(this.state.hUnits); c++){
      hunit.push(document.getElementById("unit"+c));
    }
    for(var c = 0; c < parseInt(this.state.hUnits); c++){
      console.log("hunit["+c+"]: "+hunit[c]);
      weight = hunit[c].getAttribute("title").substring(9).split(",");
      for(var c2 = 0; c2 < weight.length; c2 ++){
        sum += parseInt(weight[c2]) * parseInt(vunit[c2].getAttribute("value"));
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
    // Layer: @param, layer name, layer clickFunc, unit initialVal, num. units
    var layer = function(name, clickFunc, value, size){
      this.style = {color:'blue', border:'1px solid'};
      this.name = name;
      this.clickFunc = clickFunc;
      this.value = value;
      this.arr = [];
      for(var c = 0; c < parseInt(size); c++){ this.arr.push({id: c, text: c + 1}); }
      this.getLay = function(){
        return({
          style: this.style, name: this.name, clickFunc: this.clickFunc, 
          value: this.value, arr: this.arr, text:"layyy", id: 0
        });
      }
    };
    var lay0 = new layer("Visible Layer: ", this.updateHid, "1", this.state.vUnits);
    var lay = (new layer("Visible Layer: ", this.updateHid, "1", this.state.vUnits)).getLay();
    console.log(lay0);
    //var lay1 = new hlayer("Hidden Layer: ", this.updateLab, "0");
    //var layers = [lay0];
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
          {[lay, {id: 1, text:"b" }].map(function(layer) {
            return (<tr>
              <td>{layer.name}<br/><a onClick={layer.clickFunc} style={layer.style}><i>Propagate </i><img src="arrow.png" /></a></td>
              {[{id: 1, text: layer.text+"z"},{id: 1, text: layer.text}].map(function(unit) {
                //return <Unit value={layer.value} id={"unit"+layer.id} text={layer.text} key={layer.id}>{unit.text}</Unit>;
                return <Unit value={layer.value} id={"unit"+layer.id} text={layer.text}>{unit.text}</Unit>;
                //return <Unit value={layer.value} id={"unit"+layer.id} text={layer.text} key={layer.id}/>;
              })}
            </tr>);
          })}
          <br/><br/>
          <tr>
            <td>{lay0.name}<br/><a onClick={lay0.clickFunc} style={lay0.style}><i>Propagate </i><img src="arrow.png" /></a></td>
            {lay0.arr.map(function(unit) {
              return <Unit value={lay0.value} id={"unit"+unit.id} text={unit.text} key={unit.id}/>;
            })}
          </tr>
          <tr>
            <td>Hidden Layer: </td>
            {hid.map(function(unit) {
              return <Unit weights={genRange(0,lvis)} value={"0"} id={"unit"+unit.id} text={unit.text} key={unit.id}/>;
            })}
          </tr>
          <tr>
            <td>Label Layer: </td>
            {lab.map(function(unit) {
              return <Unit weights={genRange(lvis,lvis+lhid)} value={"0"} id={"unit"+unit.id} text={unit.text} key={unit.id}/>;
            })}
          </tr>
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