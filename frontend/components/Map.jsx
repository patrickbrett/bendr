import React, { Component } from "react";

class Map extends Component {
  constructor(props) {
    super(props);

    this.initMap = () => {
      if (window.google) {
        this.map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: -37.813762, lng: 144.970467 },
          zoom: 16,
          mapTypeId: "roadmap",
          disableDefaultUI: true,
          gestureHandling: "greedy"
        });
        this.refreshMap();
      } else {
        setTimeout(this.initMap, 200);
      }
    };

    this.refreshMap = () => {
      const {availableBars, chosenBars} = this.props;

      if (availableBars) {
        availableBars.forEach(bar => {
          const marker = new google.maps.Marker({
            position: bar.geometry.location,
            map: this.map
          });

          const infoWindow = '';
        });
      }
    };
  }

  componentDidMount() {
    window.setTimeout(this.initMap, 200);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.currentLocation) !== JSON.stringify(this.props.currentLocation)) { //calling stringify every render - bad idea?
      console.log(prevProps, this.props);
      this.refreshMap();
    }
  }

  render() {
    return <div id="map" />;
  }
}

export default Map;
