import { useState } from "react";
import "antd/dist/antd.min.css";
import useStyles from "./style";
import { useSelector, useDispatch } from "react-redux";
import { getUserLogReportPeriod } from "../../store/userSlice";
// Sub Components
import MyGraph from "./MyGraph";
import DropdownSelector from "./DropdownSelector";


function Report() {
  const classes = useStyles();
  const logsReport = useSelector((state) => state.user.logsReport);
  // Data manipulation events
  const dispatch = useDispatch();

  const fetchCustomData = (period) => {
    dispatch(getUserLogReportPeriod(period));
  };
 

  return (
    <div className={classes.container}>
      <h1>Analytics</h1>
      <DropdownSelector fetchCustomData={fetchCustomData} />
      <MyGraph data={logsReport} />
    </div>
  );
}

export default Report;
