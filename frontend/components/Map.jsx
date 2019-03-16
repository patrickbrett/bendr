import React, { Component } from "react";

class Map extends Component {
  constructor(props) {
    super(props);

    this.initMap = () => {
      if (window.google) {
        this.map = new window.google.maps.Map(document.getElementById("map"), {
          center: {lat: -37.813762, lng: 144.970467},
          zoom: 16,
          mapTypeId: "roadmap",
          disableDefaultUI: true,
          gestureHandling: "greedy"
        });
      } else {
        setTimeout(this.initMap, 200);
      }
    };

    this.refreshMap = () => {
      /*const targetLocationLatLng = new google.maps.LatLng(
        this.props.targetLocation.latitude,
        this.props.targetLocation.longitude
      );
      const homeLocationLatLng = new google.maps.LatLng(
        this.props.homeLocation.latitude,
        this.props.homeLocation.longitude
      );
      const currentLocationLatLng = new google.maps.LatLng(
        this.props.currentLocation.latitude,
        this.props.currentLocation.longitude
      );

      new google.maps.Circle({
        strokeWeight: 0,
        fillColor: '#A01A7D',
        fillOpacity: 1,
        map: this.map,
        center: targetLocationLatLng,
        radius: 25
      });

      this.currentLocationCircle = new google.maps.Circle({
        strokeColor: '#EF5D60',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#EF5D60',
        fillOpacity: 0.5,
        map: this.map,
        center: currentLocationLatLng,
        radius: 50
      });

      const lineCoords = [
        currentLocationLatLng,
        targetLocationLatLng
      ];
      this.currentToTargetLocationLine = new google.maps.Polyline({
        path: lineCoords,
        geodesic: true,
        strokeColor: '#EF5D60',
        strokeOpacity: 0.1,
        strokeWeight: 2,
        map: this.map
      });

      new google.maps.Marker({
        position: homeLocationLatLng,
        map: this.map,
        icon: "assets/images/icon-home.svg"
      });*/
    };

    this.updateMap = () => {
      /*const targetLocationLatLng = new google.maps.LatLng(
        this.props.targetLocation.latitude,
        this.props.targetLocation.longitude
      );
      const homeLocationLatLng = new google.maps.LatLng(
        this.props.homeLocation.latitude,
        this.props.homeLocation.longitude
      );
      const currentLocationLatLng = new google.maps.LatLng(
        this.props.currentLocation.latitude,
        this.props.currentLocation.longitude
      );

      const lineCoords = [
        currentLocationLatLng,
        targetLocationLatLng
      ];

      this.currentLocationCircle.setOptions({center: currentLocationLatLng});
      this.currentToTargetLocationLine.setOptions({path: lineCoords});
      this.map.panTo({lat: this.props.currentLocation.latitude - 0.0015, lng: this.props.currentLocation.longitude});*/
    }
  }

  componentDidMount() {
    window.setTimeout(this.initMap, 200);
    //this.refreshMap();*/
  }

  componentDidUpdate(prevProps) {
   /* if (JSON.stringify(prevProps.currentLocation) !== JSON.stringify(this.props.currentLocation)) { //calling stringify every render - bad idea?
      console.log(prevProps, this.props);
      this.updateMap();
    }*/
  }

  render() {
    return <div id="map" />;
  }
}

export default Map;
