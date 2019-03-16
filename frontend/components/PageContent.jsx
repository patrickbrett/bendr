import React, { Component } from "react";
import Map from "./Map.jsx";
import List from "./List.jsx";
import { apiKey } from "../apiKey.json";
const TravellingDrunkard = require("../logic/TravellingDrunkard");

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.markers = [];
    this.lines = [];

    this.state = {
      chosenBars: [],
      availableBars: [],
      isAddMode: false,
      isOrdered: false
    };

    this.retrieveBars = () => {
      fetch(`/service/bars`)
        .then(res => {
          res.json().then(json => {
            console.log("done", json.results);
            this.setState({ availableBars: json.results });
          });
        })
        .catch(err => console.log(err));
    };

    this.toggleAddMode = () => {
      this.setState(prevState => ({
        isAddMode: !prevState.isAddMode
      }));
    };

    this.chooseBar = bar => {
      this.setState(prevState => {
        const { chosenBars } = prevState;
        if (!chosenBars.includes(bar)) {
          chosenBars.push(bar);
        }
        return { chosenBars: chosenBars };
      });
    };

    this.removeBar = bar => {
      this.setState(prevState => {
        let { chosenBars } = prevState;
        if (chosenBars.includes(bar)) {
          chosenBars = chosenBars.filter(bar2 => bar2 !== bar);
        }
        this.markers.forEach(marker => {
          if (marker.bar === bar) {
            marker.setIcon("assets/icon.png");
          }
        });
        return { chosenBars: chosenBars };
      });
    };

    this.removeAll = () => {
      this.markers.forEach(marker => {
        marker.setIcon("assets/icon.png");
      });
      this.setState({ chosenBars: [] });
    };

    this.bendMe = () => {
      this.setState(prevState => {
        const route = TravellingDrunkard.calculateRoute(prevState.chosenBars);

        const barListOrdered = route.pathNames.map(barName =>
          this.state.chosenBars.find(({ name }) => name === barName)
        );

        console.log(route);

        return {
          chosenBars: barListOrdered,
          isOrdered: true
        };
      });
    };
  }

  componentDidMount() {
    this.retrieveBars();
  }

  render() {
    return (
      <div id="pageContent">
        <Map
          availableBars={this.state.availableBars}
          chosenBars={this.state.chosenBars}
          chooseBar={this.chooseBar}
          removeBar={this.removeBar}
          isAddMode={this.state.isAddMode}
          markers={this.markers}
          lines={this.lines}
        />
        <List
          chosenBars={this.state.chosenBars}
          bendMe={this.bendMe}
          removeAll={this.removeAll}
          isAddMode={this.state.isAddMode}
          toggleAddMode={this.toggleAddMode}
          removeBar={this.removeBar}
        />
      </div>
    );
  }
}

export default PageContent;
