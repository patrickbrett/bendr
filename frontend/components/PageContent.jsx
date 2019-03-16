import React, { Component } from "react";
import Map from "./Map.jsx";
import Form from "./Form.jsx";
import List from "./List.jsx";
import data from "../assets/data.json";

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bands: data.bands
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
