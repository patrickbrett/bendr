import React, { Component } from "react";
import Map from "./Map.jsx";
import Form from "./Form.jsx";
import List from "./List.jsx";

class PageContent extends Component {
  render() {
    return (
      <div id="pageContent">
        <Map />
        <Form />
        <List />
      </div>
    );
  }
}

export default PageContent;
