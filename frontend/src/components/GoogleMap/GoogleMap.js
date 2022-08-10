import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import AutoComplete from "./AutoComplete";

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
    // UBC lat and lng
    center: { lat: 49.2606, lng: -123.246 },
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

  _onZoom = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
  };

  nearbySearch = () => {
    const { mapInstance: map, mapApi: maps, curLat, curLng } = this.state;
    const request = {
      // For testing location at UBC
      //location: { lat: 49.2606, lng: -123.246 },
      // Acutal location
      location: { lat: curLat, lng: curLng },
      radius: "500",
      types: ["restaurant", "cafe"],
    };
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          const detailReqeust = {
            placeId: results[i].place_id, 
            fields: ['place_id', 'name', 'photo', 'geometry','formatted_address', 'opening_hours', 'website']
          }
          service.getDetails(detailReqeust, (place, status) =>{
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              this.createMarker(place);
            }
          });
        }
      }
    });
  };

  createMarker = (place) => {
    const { mapInstance: map, curLat, curLng} = this.state;
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
    });
    let contentString =  `<div><h1>${place.name}</h1><p>${place.formatted_address}</p></div>`;
    if(place.hasOwnProperty("opening_hours")){
      for (let day in place.opening_hours.weekday_text){
        contentString = contentString + `<div><p>${place.opening_hours.weekday_text[day]}</p></div>`
      }
    }
    if(place.hasOwnProperty("website")){
      contentString = contentString + `<div><a href=${place.website}>${place.website}</a></div>`;
    }
    const directionUrl = `https://www.google.com/maps/dir/?api=1&${curLat},${curLng}&destination=${place.geometry.location.lat()},${place.geometry.location.lng()}&destination_place_id=${place.place_id}&travelmode=walking`;
    contentString = contentString + `<div><a href=${directionUrl}>view on google map</a></div>`;
    let infowindow = new google.maps.InfoWindow({ content: contentString });
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: true,
      });
    });
  };

  createRouteMarker = (lat, lng, placeName, address, place_id) => {
    const { mapInstance: map, curLat, curLng} = this.state;
    const svgMarker = {
      path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "green",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(15, 30),
    };
    const locationMarker = new google.maps.Marker({
      map,
      position: { lat: lat, lng: lng },
      title: placeName,
      icon: svgMarker,
    });
    const directionUrl = `https://www.google.com/maps/dir/?api=1&${curLat},${curLng}&destination=${lat},${lng}&destination_place_id=${place_id}&travelmode=walking`;
    let contentString;
    if(!place_id){
       // My location
       contentString = "<div>" + "<h1>" + placeName + "</h1>" + "<p>" + address + "</p>" + "</div>";
    }else{
      // Destination
       contentString = "<div>" + "<h1>" + placeName + "</h1>" + "<p>" + address + "</p>" + `<div><a href=${directionUrl}>view on google map</a></div>` + "</div>";
    }
    let infowindow = new google.maps.InfoWindow({ content: contentString });
    locationMarker.addListener("click", () => {
      infowindow.open({
        anchor: locationMarker,
        map,
        shouldFocus: true,
      });
    });
  };

  apiHasLoaded = (map, maps) => {
    const { curLat, curLng} = this.state;

    this.setState(
      {
        mapApiLoaded: true,
        mapInstance: map,
        mapApi: maps,
      },
      () => {
        this._generateAddress();
        this.createRouteMarker(curLat, curLng, "My location", this.state.curAddress, null);
        this.nearbySearch();
      }
    );
  };

  addPlace = (place) => {
    console.log("What is place", place)
    const place_address_filtered = place.address_components.filter(
      (el) =>
        el.short_name !== "Greater Vancouver A" &&
        el.short_name !== "Metro Vancouver" &&
        el.short_name !== "CA"
    );
    // Search Destination Address
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
    this._generateRoute({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });

    this.createRouteMarker(
      place.geometry.location.lat(),
      place.geometry.location.lng(),
      place.name,
      formatted_address,
      place.place_id
    );
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

    directionsService.route(
      {
        // Origin: geo location
        origin: { lat: curLat, lng: curLng },
        // Search Destination lat and lng
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
            strokeColor: "#34aefa",
            strokeOpacity: 1.0,
            strokeWeight: 5,
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
    const { mapApi, curLat, curLng } = this.state;

    const geocoder = new mapApi.Geocoder();

    geocoder.geocode(
      { location: { lat: curLat, lng: curLng } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.setState({
              curAddress: results[0].formatted_address,
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
    const { mapApiLoaded, mapInstance, mapApi } = this.state;

    return (
      <Wrapper>
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
            onChange={this._onZoom}
            onClick={this.onClickMarker}
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_API_KEY,
              libraries: ["places", "geometry"],
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          >
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
