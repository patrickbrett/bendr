import React, { Component } from "react";
import Map from "./Map.jsx";
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

    this.chooseBar = (bar) => {
      console.log("here", bar);
      this.setState(prevState => {
        const { chosenBars } = prevState;
        if (!chosenBars.includes(bar)) {
          chosenBars.push(bar);
        }
        return { chosenBars: chosenBars };
      })
    }
  }

  componentDidMount() {
    this.retrieveBars();
  }

  render() {
    return (
      <div id="pageContent">
        <Map availableBars={this.state.availableBars} chooseBar={this.chooseBar} />
        <List chosenBars={this.state.chosenBars} />
      </div>
    );
  }
}

export default PageContent;
