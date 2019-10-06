import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    values: []
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/values')
      .then((res) => this.setState({ values: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="App">
        {this.state.values.length > 0 && this.state.values[0]["name"]}
        {this.state.values.length > 0 && this.state.values[1]["name"]}
        {this.state.values.length > 0 && this.state.values[2]["name"]}
      </div>
    );
  }
}

export default App;
