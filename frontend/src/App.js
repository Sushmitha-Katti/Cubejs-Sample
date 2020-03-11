import React, { Component } from 'react';
import Chart from './Components/Chart.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { addchart:[] };
  }
  onButtonPress = () => {
    this.setState({
      addchart: [...this.state.addchart,<Chart/>]
    })
  };

    

  render() {
  

    
    return (
      <>
      <button type="button"  onClick={this.onButtonPress}>Add</button>
      {this.state.addchart.length>0?this.state.addchart.map(chart => <div style= {{border:"1px solid black"}}>{chart}</div>): ""}

      
      </>
    );
  }
}

export default App;