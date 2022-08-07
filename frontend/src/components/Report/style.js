/*
    Styles for Report Page
*/

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    color: "#fff",
    padding: "1rem",
    transition: "0.3s ease-in-out",
    width: "1200px",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  dropdownContainer: {
    position: "absolute",
    right: 10,
    "& button": {
      color: "black",
      border: "1.5px solid #EDEEF1",
      width: "150px",
      borderRadius: "15px",
    },
  },
  nutrientDropdownContainer: {
    position: "absolute",
    right: 200,
    "& button": {
      color: "black",
      border: "1.5px solid #EDEEF1",
      width: "150px",
      borderRadius: "15px",
    },
  },
  graphContainer: {
    color: "#fff",
    backgroundColor: "rgb(255, 255, 255)",
    padding: "1rem",
    transition: "0.3s ease-in-out",
    width: "100%",
    height: "400px",
  },
});

export default useStyles;
