var Autoencoder = React.createClass({
  render: function(){
    return(
      <div>
        Hello World
      </div>
    );
  }
});
var Settings = React.createClass({
  render: function(){
    <table>
      <tr>
        <td>Visible units: <input type="text" value="2"></input></td>
      </tr><tr>
        <td>Hidden units: <input type="text" value="2"></input></td>
      </tr><tr>
        <td>Label units: <input type="text" value="3"></input></td>
      </tr>
    </table>
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
var GraphObj = React.createClass({
  render: function(){
    return(
      <div></div>
    );
  }
});
ReactDOM.render(
  <div>
    Helloo0<br/>
    <Graph/>
    <Autoencoder />
  </div>,
  document.getElementById('content')
);
