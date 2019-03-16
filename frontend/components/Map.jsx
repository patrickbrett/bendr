import React, { Component } from "react";

class Map extends Component {
  constructor(props) {
    super(props);

    this.mapStylesDark = [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        {
          elementType: "labels.text.stroke",
          stylers: [{ color: "#242f3e" }]
        },
        {
          elementType: "labels.text.fill",
          stylers: [{ color: "#746855" }]
        },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }]
        },
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f", visibility: "on" }]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76", visibility: "on" }]
        },
        {
          featureType: "transit",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }]
        }
      ];

    this.initMap = () => {
      if (window.google) {
        this.map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: -37.813762, lng: 144.970467 },
          zoom: 14,
          mapTypeId: "roadmap",
          disableDefaultUI: true,
          gestureHandling: "greedy",
          styles: this.mapStylesDark
        });
        this.refreshMap();
      } else {
        setTimeout(this.initMap, 200);
      }
    };

    this.refreshMap = () => {
      const { availableBars } = this.props;

      const infoWindows = [];

      if (availableBars && window.google) {
        availableBars.forEach(bar => {
          const marker = new google.maps.Marker({
            position: bar.geometry.location,
            map: this.map,
            icon: "assets/icon.png"
          });

          if (this.props.hangoverMode) {
            marker.setIcon("assets/dayIcon.png");
          }

          marker.bar = bar;

          this.props.markers.push(marker);

          const infoWindowContent = `
            <div>${bar.name}</div>
            <div>Rating: ${bar.rating}</div>
            <div>Price level: ${bar.price_level}</div>
          `;

          const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
          });

          infoWindows.push(infoWindow);

          marker.addListener("click", () => {
            if (this.props.isAddMode) {
              if (this.props.chosenBars.includes(bar)) {
                this.props.removeBar(bar);
                if (this.props.hangoverMode) {
                  marker.setIcon("assets/dayIcon.png");
                } else {
                  marker.setIcon("assets/icon.png");
                }
              } else if (this.props.chosenBars.length < 7) {
                this.props.chooseBar(bar);
                if (this.props.hangoverMode) {
                  marker.setIcon("assets/dayIconWhite.png");
                } else {
                  marker.setIcon("assets/iconWhite.png");
                }
              }
            } else {
              infoWindows.forEach(infoWindow => infoWindow.close());
              if (infoWindow.isOpen) {
                infoWindow.close(this.map, marker);
                infoWindow.isOpen = false;
              } else {
                infoWindow.open(this.map, marker);
                infoWindow.isOpen = true;
              }
            }
          });
        });

        this.forceUpdate();
      } else {
        setTimeout(this.refreshMap, 200);
      }
    };

    this.updateCameraPosition = () => {
      if (this.map) {
        this.props.markers.forEach(marker => {
          marker.setMap(null);
        });

        this.map.panTo(this.props.cameraPosition);
      }
    };

    this.refreshLines = (removeLine = false) => {
      const lineCoords = this.props.chosenBars.map(bar => bar.geometry.location);
      const lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4
      };
     if (this.props.polylines[0]) this.props.polylines[0].setMap(null);
      this.props.polylines[0] = new google.maps.Polyline(
        {
          path: lineCoords,
          geodesic: true,
          strokeColor: this.props.hangoverMode ? '#000' : '#fff',
          strokeOpacity: 0,
          icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
          }],
          strokeWeight: 2
        }
      );
      if (!removeLine) this.props.polylines[0].setMap(this.map);
    };

    this.toggleDarkTheme = () => {
      const currentOptions = {};
      if (this.props.hangoverMode) {
        currentOptions.styles = [];
        this.props.markers.forEach(marker => {
          marker.setIcon("assets/dayIcon.png");
        });
      } else {
        currentOptions.styles = this.mapStylesDark;
        this.props.markers.forEach(marker => {
          marker.setIcon("assets/icon.png");
        });
      }
      this.props.markers.forEach(marker => {
        marker.setMap(null);
      });
      this.map.setOptions({ styles: currentOptions.styles});
    };
  }

  componentDidMount() {
    window.setTimeout(this.initMap, 200);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.availableBars) !==
      JSON.stringify(this.props.availableBars)
    ) {
      this.refreshMap();
    }

    if (
      JSON.stringify(prevProps.chosenBars) !==
      JSON.stringify(this.props.chosenBars) || this.props.isOrdered && !prevProps.isOrdered
    ) {
      this.refreshLines(this.props.chosenBars.length < prevProps.chosenBars.length);
    }

    if (JSON.stringify(prevProps.cameraPosition) !==
      JSON.stringify(this.props.cameraPosition)) {
      this.updateCameraPosition();
    }

    if (JSON.stringify(prevProps.hangoverMode) !==
      JSON.stringify(this.props.hangoverMode)) {
      this.toggleDarkTheme();
    }
  }

  render() {
    return <div id="map" />;
  }
}

export default Map;
