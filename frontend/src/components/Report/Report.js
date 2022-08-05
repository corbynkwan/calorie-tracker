import { useState } from "react";
import "antd/dist/antd.min.css";
import useStyles from "./style";
import { useSelector, useDispatch } from "react-redux";
import { getUserLogReportPeriod } from "../../store/userSlice";
// Sub Components
import MyGraph from "./MyGraph";
import DropdownSelector from "./DropdownSelector";
import dataSet from "./Data";

function Report() {
  const classes = useStyles();
  const [data, setData] = useState(dataSet.Today);
  const logsReport = useSelector((state) => state.user.logsReport);
  // Data manipulation events
  const dispatch = useDispatch();

  const fetchCustomData = (period) => {
    dispatch(getUserLogReportPeriod(period));
    setData(logsReport);
  };
 

  return (
    <div className={classes.container}>
      <h1>Analytics</h1>
      <DropdownSelector fetchCustomData={fetchCustomData} />
      <MyGraph data={data} />
    </div>
  );
}

export default Report;
