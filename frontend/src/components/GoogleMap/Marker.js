// Marker.js
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  marker: {
    position: "absolute",
    width: "60px",
    height: "60px",
  }
}));

const handleClick = (lat, lng) =>{
  let infowindow = new google.maps.InfoWindow({ content: "my location" });
  infowindow.open({
    anchor: {lat: lat, lng: lng},
    shouldFocus: false,
  });
}

const Marker = ({ text, onClickMarker}) => {
  const classes = useStyles();
  return <div>
         <img src="https://play-lh.googleusercontent.com/Pw5p_lV7R11FBhf4ImtrQLDKByRttJcEc2oXEY3i_ZaSEmXsV7AuAelC7xCRhuFvHQ" 
         alt={text} 
         className={classes.marker}
         onClick={onClickMarker}
      />
    </div>;
};

export default Marker;
