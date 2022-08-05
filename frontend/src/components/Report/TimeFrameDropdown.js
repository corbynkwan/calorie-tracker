import React, { useState } from "react";
import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useStyles from "./style";
import { menu } from "./Item";


const timeFrameDropdownCategories = [
  {
    key: 0,
    content: "Last 7 days",
    value: "Last_7_days",
    period: 7
  },
  {
    key: 1,
    content: "Last 14 days",
    value: "Last_14_days",
    period: 14
  },
  {
    key: 2,
    content: "Last 30 days",
    value: "Last_30_days",
    period: 30
  }
];

export const TimeFrameDropdown = ({ fetchCustomData }) => {
  const classes = useStyles();
  const [activeTimeFrame, setActiveTimeFrame] = useState(0);


  const handleDataFetching = (key, period) => {
    setActiveTimeFrame(key);
    fetchCustomData(period);
  };

  return (
    <div className={classes.dropdownContainer}>
      <Dropdown
        overlay={menu(
          handleDataFetching,
          timeFrameDropdownCategories,
          timeFrameDropdownCategories[activeTimeFrame]
        )}
      >
        <Button>
          {timeFrameDropdownCategories[activeTimeFrame].content} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default TimeFrameDropdown;
