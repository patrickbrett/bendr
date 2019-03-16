import React, { Component } from "react";
import Map from "./Map.jsx";
import Search from "./Search.jsx";
import List from "./List.jsx";
import { apiKey } from "../apiKey.json";
const TravellingDrunkard = require("../logic/TravellingDrunkard");

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.markers = [];
    this.lines = [];
    this.polylines = [];

    this.state = {
      chosenBars: [],
      availableBars: [],
      isAddMode: true,
      isOrdered: false,
      searchTerm: "",
      prevSearchTerm: "",
      cameraPosition: {
        lat: 0,
        lng: 0
      },
      hangoverMode: false
    };

    this.moveCamera = (callback) => {
      fetch(
        `/service/camera/?searchTerm=${encodeURIComponent(this.state.searchTerm)}`
      )
        .then(res => {
          res.json().then(json => {
            this.setState({ cameraPosition: json.results[0].geometry.location, chosenBars: [], prevSearchTerm: this.state.searchTerm }, callback);
          });
        })
        .catch(err => console.log(err));
    };

    this.retrieveBars = () => {
      fetch(
        `/service/bars/?lat=${encodeURIComponent(
          this.state.cameraPosition.lat
        )}&lng=${encodeURIComponent(this.state.cameraPosition.lng)}&hangoverMode=${this.state.hangoverMode}`
      )
        .then(res => {
          res.json().then(json => {
            console.log("done", json.results);
            this.setState({ availableBars: json.results });
          });
        })
        .catch(err => console.log(err));
    };

    this.performSearch = () => {
      const callback = ()=>this.moveCamera(this.retrieveBars);
      if (this.state.searchTerm === "im hungover") {
        this.removeAll();
        this.setState({hangoverMode: true, searchTerm: this.state.prevSearchTerm}, callback);
      } else if (this.state.searchTerm === "more alcohol please") {
        this.removeAll();
        this.setState({hangoverMode: false, searchTerm: this.state.prevSearchTerm}, callback);
      } else {
        callback();
      }
    };

    this.toggleAddMode = () => {
      this.setState(prevState => {
        return {
          isAddMode: !prevState.isAddMode
        };
      });
    };

    this.chooseBar = bar => {
      this.setState(prevState => {
        let { chosenBars, isAddMode } = prevState;
        if (!chosenBars.includes(bar) && chosenBars.length <= 7) {
          chosenBars.push(bar);
        }
        this.markers.forEach(marker => {
          if (marker.bar === bar) {
            if (this.state.hangoverMode) {
              marker.setIcon("assets/dayIconWhite.png");
            } else {
              marker.setIcon("assets/iconWhite.png");
            }
          }
        });
        return { chosenBars, isAddMode, isOrdered: false };
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
            if (this.props.hangoverMode) {
              marker.setIcon("assets/dayIcon.png");
            } else {
              marker.setIcon("assets/icon.png");
            }
          }
        });
        console.log(this.polylines);
        console.log(this.polylines.length == 0)
        if (this.polylines.length !== 0)
        {
          this.polylines[0].setMap(null);
        }
        return { chosenBars: chosenBars, isOrdered: false };
      });
    };

    this.removeAll = (callback) => {
      this.markers.forEach(marker => {
        if (this.state.hangoverMode) {
          marker.setIcon("assets/dayIcon.png");
        } else {
          marker.setIcon("assets/icon.png");
        }
      });
      this.setState({ chosenBars: [], isOrdered: false }, callback);
    };

    this.feelingLucky = () => {
      this.removeAll(()=>{
        this.setState(prevState => {
          let newChosenBars = Array.from(prevState.availableBars).sort(()=>Math.random()-0.5).slice(0, 5);
          this.markers.forEach(marker => {
              if (newChosenBars.includes(marker.bar)) {
                if (this.state.hangoverMode) {
                  marker.setIcon("assets/dayIconWhite.png");
                } else {
                  marker.setIcon("assets/iconWhite.png");
                }
              }
          });
          return { chosenBars: newChosenBars, isOrdered: false };
        });
      });
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

    this.updateSearch = e => {
      let value = e.target.value;
        this.setState(prevState => ({ searchTerm: value }));
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  render() {
    return (
      <div id="pageContent">
        <Map
          availableBars={this.state.availableBars}
          isOrdered={this.state.isOrdered}
          chosenBars={this.state.chosenBars}
          chooseBar={this.chooseBar}
          removeBar={this.removeBar}
          isAddMode={this.state.isAddMode}
          markers={this.markers}
          lines={this.lines}
          polylines={this.polylines}
          cameraPosition={this.state.cameraPosition}
          hangoverMode={this.state.hangoverMode}
        />
        <Search
          updateSearch={this.updateSearch}
          searchTerm={this.state.searchTerm}
          performSearch={this.performSearch}
        />
        <List
          chosenBars={this.state.chosenBars}
          bendMe={this.bendMe}
          removeAll={this.removeAll}
          isAddMode={this.state.isAddMode}
          toggleAddMode={this.toggleAddMode}
          removeBar={this.removeBar}
          feelingLucky={this.feelingLucky}
        />
      </div>
    );
  }
}

export default PageContent;
