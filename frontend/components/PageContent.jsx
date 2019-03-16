import React, { Component } from "react";
import Map from "./Map.jsx";
import Form from "./List.jsx";
import List from "./List.jsx";
import data from "../assets/data.json";
import {apiKey} from "../apiKey.json";

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenBars: [

      ]
    };

    this.retrieveBars = () => {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&radius=1000&location=-37.812609,144.958966&keyword=bar`;
    };
  }

  render() {
    return (
      <div id="pageContent">
        <Map loadData={this.state}/>
        <Form />
        <List />
      </div>
    );
  }
}

export default PageContent;
