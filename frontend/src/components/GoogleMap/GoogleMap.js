import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import AutoComplete from "./AutoComplete";
import Marker from "./Marker";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  text-align: center;
`;

class MyGoogleMap extends Component {
  state = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    geoCoder: null,
    curRoutePolyline: null,
    places: [],
    center: [],
    zoom: 14,
    address: "",
    draggable: true,
    lat: null,
    lng: null,
    curLat: null,
    curLng: null,
    curAddress: "",
  };

  componentWillMount() {
    this.setCurrentLocation();
  }

  onMarkerInteraction = (childKey, childProps, mouse) => {
    this.setState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    });
  };
  onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    this.setState({ draggable: true });
    this._generateAddress();
  };

  _onChange = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
  };

  // _onClick = (value) => {
    // this.setState({
    //   lat: value.lat,
    //   lng: value.lng,
    // });
  // };

  nearbySearch = () => {
    const { mapInstance: map, mapApi: maps, curLat, curLng } = this.state;
    const request = {
      // For testing location at UBC
      // location: { lat: 49.2606, lng: -123.246 },
      // Acutal location
      location: { lat: curLat, lng: curLng },
      radius: "500",
      // openNow: true,
      types: ["restaurant", "cafe"],
    };
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
        }
      }
    });
  };

  createMarker = (place) => {
    const { mapInstance: map } = this.state;
    if (!place.geometry || !place.geometry.location) return;
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
    });
    const contentString =
      "<div>" +
      "<h1>" +
      place.name +
      "</h1>" +
      "</div>" +
      "<p>" +
      place.vicinity +
      "</p>";
    let infowindow = new google.maps.InfoWindow({ content: contentString });
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: true,
      });
    });
  };

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
    this._generateRoute(null);
    this._generateAddress();
    this.nearbySearch();
  };

  addPlace = (place) => {
    const place_address_filtered = place.address_components.filter(
      (el) =>
        el.short_name !== "Greater Vancouver A" &&
        el.short_name !== "Metro Vancouver" &&
        el.short_name !== "CA"
    );
    const formatted_address = place_address_filtered.reduce(
      (adrs, adrsSegment) => adrs + adrsSegment.short_name + " ",
      ""
    );

    this.setState({
      places: [place],
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      address: formatted_address,
    });
    this._generateAddress();
    this._generateRoute({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };

  _generateRoute(dest) {
    const {
      mapInstance: map,
      mapApi: maps,
      curRoutePolyline,
      curLat,
      curLng,
    } = this.state;

    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    if (dest === null) {
      // UBC lat and lng
      dest = { lat: 49.2606, lng: -123.246 };
    }
    directionsService.route(
      {
        // Origin: geo location
        origin: { lat: curLat, lng: curLng },
        // Destination: UBC when first rendered
        destination: dest,
        travelMode: "WALKING",
      },
      (response, status) => {
        if (status === "OK") {
          directionsDisplay.setDirections(response);
          if (curRoutePolyline !== null) {
            curRoutePolyline.setMap(null);
          }
          let routePolyline = new google.maps.Polyline({
            path: response.routes[0].overview_path,
          });
          routePolyline.setMap(map);
          this.setState({
            curRoutePolyline: routePolyline,
          });
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  _generateAddress() {
    const { mapApi } = this.state;

    const geocoder = new mapApi.Geocoder();

    geocoder.geocode(
      { location: { lat: this.state.curLat, lng: this.state.curLng } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.setState({
              curAddress: results[0].formatted_address,
              curLat: results[0].geometry.location.lat(),
              curLng: results[0].geometry.location.lng(),
            });
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }
  // Get Current Location Coordinates
  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: [position.coords.latitude, position.coords.longitude],
          curLat: position.coords.latitude,
          curLng: position.coords.longitude,
        });
      });
    }
  }

  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;

    return (
      <Wrapper>
        {mapApiLoaded && (
          <div>
            <h2>Search for a Restarant</h2>
            <AutoComplete
              map={mapInstance}
              mapApi={mapApi}
              addplace={this.addPlace}
            />
          </div>
        )}
        <div className="main-wrapper">
          <GoogleMapReact
            center={this.state.center}
            zoom={this.state.zoom}
            draggable={this.state.draggable}
            options={{
              streetViewControl: true,
              disableDefaultUI: false,
              mapTypeControl: true,
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "on" }],
                },
              ],
            }}
            onChange={this._onChange}
            onChildMouseDown={this.onMarkerInteraction}
            onChildMouseUp={this.onMarkerInteractionMouseUp}
            onChildMouseMove={this.onMarkerInteraction}
            // onClick={this._onClick}
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_API_KEY,
              libraries: ["places", "geometry"],
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          >
            <Marker
              text={this.state.address}
              lat={this.state.lat}
              lng={this.state.lng}
            />
            <Marker
              text={this.state.curAddress}
              lat={this.state.curLat}
              lng={this.state.curLng}
            />
          </GoogleMapReact>
        </div>
        <div className="info-wrapper">
          {/* <div className="map-details">
            Latitude: <span>{this.state.lat}</span>, Longitude:{" "}
            <span>{this.state.lng}</span>
          </div>
          <div className="map-details">
            Zoom: <span>{this.state.zoom}</span>
          </div> */}
          <div className="map-details">
            Destination: <span>{this.state.address}</span>
          </div>
          {/* <div className="map-details">
            Cur Latitude: <span>{this.state.curLat}</span>, Cur Longitude:{" "}
            <span>{this.state.curLng}</span>
          </div> */}
          <div className="map-details">
            Current Location: <span>{this.state.curAddress}</span>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default MyGoogleMap;
