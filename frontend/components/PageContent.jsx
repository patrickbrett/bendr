import React, { Component } from "react";
import Map from "./Map.jsx";
import Form from "./List.jsx";
import List from "./List.jsx";
import data from "../assets/data.json";
import { apiKey } from "../apiKey.json";

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenBars: []
    };

    this.retrieveBars = () => {
      fetch(`/service/bars`)
        .then(res => {
          res.json().then(json => {
            console.log("done", json.results);
            this.setState({availableBars: json.results});
          });
        })
        .catch(err => console.log(err));
    };
  }

  componentDidMount() {
    this.retrieveBars();
  }

  render() {
    return (
      <div id="pageContent">
        <Map availableBars={this.state.availableBars} />
        <Form />
        <List />
      </div>
    );
  }
}

export default PageContent;
