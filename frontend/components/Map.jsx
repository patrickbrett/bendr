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
          gestureHandling: "greedy",
          styles: [
            {
              featureType: 'poi',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'transit',
              elementType: 'labels.icon',
              stylers: [{visibility: 'off'}]
            }
          ]
        });
        this.refreshMap();
      } else {
        setTimeout(this.initMap, 200);
      }
    };

    this.refreshMap = () => {
      const {availableBars, chosenBars} = this.props;

      const infoWindows = [];

      if (availableBars) {
        availableBars.forEach(bar => {
          const marker = new google.maps.Marker({
            position: bar.geometry.location,
            map: this.map,
            icon: "assets/icon.png"
          });

          const infoWindowContent = `
            <div>${bar.name}</div>
            <div>Rating: ${bar.rating}</div>
            <div>Price level: ${bar.price_level}</div>
          `;

          const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
          });

          infoWindows.push(infoWindow);

          marker.addListener("click", ()=>{
            infoWindows.forEach(infoWindow => infoWindow.close());
            if (infoWindow.isOpen) {
              infoWindow.close(this.map, marker);
              infoWindow.isOpen = false;
              this.props.chooseBar(bar);
            } else {
              infoWindow.open(this.map, marker);
              infoWindow.isOpen = true;
            }
          });
        });
      } else {
        setTimeout(this.refreshMap, 200);
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
