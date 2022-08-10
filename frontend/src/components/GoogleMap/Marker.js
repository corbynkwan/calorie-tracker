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

const Marker = ({ text, onClickMarker}) => {
  const classes = useStyles();
  return <div>
         <img src= "https://play-lh.googleusercontent.com/eNustQYcjMXlZAteHQmdB6E2r0-E0cl3utGPvO51ZC-50rhqkYFTuhVp4ip_tZL-la8"
         alt={text} 
         className={classes.marker}
      />
    </div>;
};

export default Marker;