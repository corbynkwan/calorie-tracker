import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  text-align: center;
`;

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  componentDidMount({ map, mapApi } = this.props) {
    // center is set around UBC Thunderbird Residence 
    const center = { lat: 49.2606, lng: -123.246 };
    // Create a bounding box with sides ~2km away from the center point
    const defaultBounds = {
      north: center.lat + 0.02,
      south: center.lat - 0.02,
      east: center.lng + 0.02,
      west: center.lng - 0.02,
    };
    const options = {
      bounds: defaultBounds,
      componentRestrictions: { country: "ca" },
      fields: ["place_id","address_components", "geometry", "icon", "name"],
      strictBounds: true,
      // restrict your search to a specific type of result
      types: ["restaurant", "cafe"],
    };

    this.autoComplete = new mapApi.places.Autocomplete(
      this.searchInput,
      options
    );
    this.autoComplete.addListener("place_changed", this.onPlaceChanged);
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  onPlaceChanged = ({ map, addplace } = this.props) => {
    const place = this.autoComplete.getPlace();

    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    addplace(place);
    this.searchInput.blur();
  };

  clearSearchBox() {
    this.searchInput.value = "";
  }

  render() {
    return (
      <Wrapper>
        <input
          className="search-input"
          ref={(ref) => {
            this.searchInput = ref;
          }}
          type="text"
          onFocus={this.clearSearchBox}
          placeholder="Enter a location"
        />
      </Wrapper>
    );
  }
}

export default AutoComplete;
