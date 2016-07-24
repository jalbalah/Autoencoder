var Autoencoder = React.createClass({
  getInitialState: function(){
    return({
      vUnits: 2,
      hUnits: 3,
      lUnits: 2,
      lvis: 0,
      lhid: 0,
      llab: 0,
      units: []
    });
  },
  componentDidMount: function(){
    var vis = [], hid = [], lab = [];
    var c, max;
    var lvis, lhid, llab; // lengths
    var units = [];
    for(var c = 0; c < parseInt(this.state.vUnits); c++){ vis.push({id: c, text: c + 1}); }
    for(c2 = c; c < c2 + parseInt(this.state.hUnits); c++){ hid.push({id: c, text: c + 1}); }
    for(c2 = c; c < c2 + parseInt(this.state.lUnits); c++){ lab.push({id: c, text: c + 1}); }
    lvis = vis.length; lhid = hid.length; llab = lab.length;
    this.setState({lvis: vis.length, lhid: hid.length, llab: lab.length});
  },
  updateHid: function(){
    var sum = 0.;
    // var weights = this.
    console.log(sum);
    for(var c = 0; c < this.state.lvis; c++){
      sum += this.state.units[c];
    }
    console.log(Math.tanh(sum));
  },
  setVUnits: function(event){ this.setState({vUnits: event.target.value}); },
  setHUnits: function(event){ this.setState({hUnits: event.target.value}); },
  setLUnits: function(event){ this.setState({lUnits: event.target.value}); },
  render: function(){
    var vis = [], hid = [], lab = [];
    var c, max;
    var lvis, lhid, llab; // lengths
    var units = [];
    for(var c = 0; c < parseInt(this.state.vUnits); c++){ vis.push({id: c, text: c + 1}); }
    for(c2 = c; c < c2 + parseInt(this.state.hUnits); c++){ hid.push({id: c, text: c + 1}); }
    for(c2 = c; c < c2 + parseInt(this.state.lUnits); c++){ lab.push({id: c, text: c + 1}); }
    lvis = vis.length; lhid = hid.length; llab = lab.length;
    var genRange = function(start, end){
      var r = [];
      for(var c=start;c<end;c++){
        r.push([1.00]);
        //r.push([c, 1.00]);
      }
      return r;
    }
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
          <tr>
            <td>Visible Layer: <br/><a onClick={this.updateHid} style={{color:'blue', border:'1px solid'}}><i>Propagate </i><img src="arrow.png" /></a></td>
            {vis.map(function(unit) {
              return <Unit id={"unit"+unit.id} text={unit.text} key={unit.id}/>;
            })}
          </tr>
          <tr>
            <td>Hidden Layer: </td>
            {hid.map(function(unit) {
              return <Unit weights={genRange(0,lvis)} id={"unit"+unit.id} text={unit.text} key={unit.id}/>;
            })}
          </tr>
          <tr>
            <td>Label Layer: </td>
            {lab.map(function(unit) {
              return <Unit weights={genRange(lvis,lvis+lhid)} id={"unit"+unit.id} text={unit.text} key={unit.id}/>;
            })}
          </tr>
        </table>
        </div>
        <svg height="210" width="500">
          <line x1={0} y1={0} x2={200} y2={200} className="line" />
          Sorry, browser does not support inline SVG.
        </svg>
      </div>
    );
  },
});
var Unit = React.createClass({
  unitClicked: function(){
    console.log(this.state.value);
    if(this.state.value == 0)
      this.state.value = 1;
    else
       this.state.value = 0;
     this.forceUpdate();
  },
  getInitialState: function(){
    return({
      value: 1,
    });
  },
  render: function(){
    var weights = [];
    if(this.props.weights != undefined) weights = this.props.weights;
    return(
      <td onClick={this.unitClicked} title={"weights: "+weights} id={this.props.id} 
          className={"unit"} style={{backgroundColor:'rgb(238,238,'+(255-255*this.state.value)+')',color:'black'}} key={this.props.key}>
        Unit: {this.props.text}<br/>
        Value: {this.state.value}
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