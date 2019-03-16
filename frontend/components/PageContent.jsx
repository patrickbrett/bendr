import React, { Component } from "react";
import Map from "./Map.jsx";
import List from "./List.jsx";
import data from "../assets/data.json";
import { apiKey } from "../apiKey.json";

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.markers = [];

    this.state = {
      chosenBars: [],
      availableBars: [],
      isAddMode: false
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

    this.toggleAddMode = () => {
      this.setState(prevState=>({
        isAddMode: !prevState.isAddMode
      }));
    };

    this.chooseBar = (bar) => {
      this.setState(prevState => {
        const { chosenBars } = prevState;
        if (!chosenBars.includes(bar)) {
          chosenBars.push(bar);
        }
        return { chosenBars: chosenBars };
      });
    };

    this.removeBar = (bar) => {
      this.setState(prevState => {
        let { chosenBars } = prevState;
        if (chosenBars.includes(bar)) {
          chosenBars = chosenBars.filter(bar2 => bar2 !== bar);
        }
        return { chosenBars: chosenBars };
      });
    };

    this.removeAll = () => {
      this.markers.forEach(marker => {
        marker.setIcon("assets/icon.png");
      });
      this.setState({ chosenBars: [] });
    };
  }

  componentDidMount() {
    this.retrieveBars();
  }

  render() {
    return (
      <div id="pageContent">
        <Map availableBars={this.state.availableBars} chosenBars={this.state.chosenBars} chooseBar={this.chooseBar} removeBar={this.removeBar} isAddMode={this.state.isAddMode} markers={this.markers} />
        <List chosenBars={this.state.chosenBars} removeAll={this.removeAll} isAddMode={this.state.isAddMode} toggleAddMode={this.toggleAddMode} removeBar={this.removeBar} />
      </div>
    );
  }
}

export default PageContent;
