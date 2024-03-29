import { useState } from "react";
import "antd/dist/antd.min.css";
import useStyles from "../../components/Report/style";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getUserLogReportPeriod } from "../../store/userSlice";
// Sub Components
import MyGraph from "../../components/Report/MyGraph";
import TimeFrameDropdown from "../../components/Report/TimeFrameDropdown";
import NutrientDropdown from "../../components/Report/NutrientDropdown";
import HeaderWithSearch from "../../components/HeaderWithSearch/HeaderWithSearch";

function Report(props) {
  const classes = useStyles();
  const logsReport = useSelector((state) => state.user.logsReport);
  const [selectedNutrient, setSelectedNutrient] = useState("calories");
  // Data manipulation events
  const dispatch = useDispatch();

  const setNutrientGraph = (value) => {
    setSelectedNutrient(value);
  };

  const fetchCustomData = (period) => {
    dispatch(getUserLogReportPeriod(period));
  };

  return (
    <section>
      <HeaderWithSearch user={props.user} logout={props.logout} inner={true}/>
      <div>
        <Grid container
        justify="center"
        alignItems="center"
        direction="column">
          <Grid item>
          <div className={classes.container}>
            <h1>Nutrition Report</h1>
            <h1>{selectedNutrient}</h1>
            <NutrientDropdown setNutrientGraph={setNutrientGraph} />
            <TimeFrameDropdown fetchCustomData={fetchCustomData} />
            <MyGraph data={logsReport} selectedNutrient={selectedNutrient} />
          </div>
          </Grid>
        </Grid>
      </div>
    </section>
    
  );
}

export default Report;
