import React, { Component } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

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
      <div>
        <Header as='h2' icon='tree' content='Uptime Guarantee' />
        <List>
          <List.Item>{this.state.values.length > 0 && this.state.values[0]["name"]}</List.Item>
          <List.Item>{this.state.values.length > 0 && this.state.values[1]["name"]}</List.Item>
          <List.Item>{this.state.values.length > 0 && this.state.values[2]["name"]}</List.Item>
        </List>
      </div>
    );
  }
}

export default App;
