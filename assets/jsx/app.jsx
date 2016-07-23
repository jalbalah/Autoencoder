var Autoencoder = React.createClass({
  render: function(){
    return( 
      <div><br />
        <table className="autoencoder">
          <tr>
            <td><h3>Visible Layer</h3></td>
            <td>{"\u202f"}</td>
            <td><h3>Hidden Layer</h3></td>
            <td>{"\u202f"}</td>
            <td><h3>Label Layer</h3></td>
          </tr>
          <tr>
            <td><Unit /></td>
            <td>{"\u202f"}</td>
            <td><Unit /></td>
            <td>{"\u202f"}</td>
            <td><Unit /></td>
          </tr>
          <tr>
            <td><Unit /></td>
            <td>{"\u202f"}</td>
            <td><Unit /></td>
            <td>{"\u202f"}</td>
            <td><Unit /></td>
          </tr>
          <tr>
            <td><Unit /></td>
            <td>{"\u202f"}</td>
            <td>{"\u202f"}</td>
            <td>{"\u202f"}</td>
            <td><Unit /></td>
          </tr>
        </table>
        <div>
          <svg height="210" width="500">
            <line x1={0} y1={0} x2={200} y2={200} className="line" />
            Sorry, your browser does not support inline SVG.
          </svg>
        </div><br/>
      </div>
    );
  },
});
var AE = React.createClass({
  function vLayer(id_prefix, size){
    var vl = [];
    for(var c = 0; c < size; c++){
      vl.push({id: id_prefix + c, });
    }
    return vl;
  }
  render: function(){
    <Layer units={vLayer} />
  }
});
var Layer = React.createClass({
  render: function() {
    var results = this.props.results;
    console.log(results);
    return (
      <ol>
        {units.map(function(unit) {
          console.log(unit.id);
          return <li key={unit.id}>{unit.}</li>;
        })}
      </ol>
    );
  }
});
var Unit = React.createClass({
  getInitialState: function(){
    return({
      value: 0
    });
  },
  render: function(){
    return(
      <div className="unit">
        Unit: {this.state.value}
      </div>
    );
  }
});
var Settings = React.createClass({
  getInitialState: function(){
    return({
      vUnits: 2,
      hUnits: 2,
      lUnits: 3,
    });
  },
  render: function(){
    return(
      <div>
        <table>
          <tr>
            <td>Visible units: <input type="text" value={this.state.vUnits}></input></td>
            <td>Hidden units: <input type="text" value={this.state.hUnits}></input></td>
            <td>Label units: <input type="text" value={this.state.lUnits}></input></td>
          </tr>
        </table>
      </div>
    );
  }
});
var Graph = React.createClass({
  getInitialState: function(){
    return({
      showCoord: true
    });
  },
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
    <AE />
  </div>,
  document.getElementById('content')
);