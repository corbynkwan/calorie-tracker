import React, { useState } from "react";
import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useStyles from "./style";
import { menu } from "./Item";


/**
 * Add your all dropdown categories here with unique key
 */
const dropdownCategories = [
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



export const DropdownSelector = ({ fetchCustomData }) => {
  const classes = useStyles();

  // This state is used to track selected value from dropdown
  const [activeTimeFrame, setActiveTimeFrame] = useState(0);


  const handleDataFetching = (key, period) => {
    setActiveTimeFrame(key);
   
    /**
     * This function invokes when user selectes an item from dropdown,
     * you can call a function to fetch data with key or value
     * @here we called @function fetchCustomData(value)
     */
    fetchCustomData(period);
  };

  return (
    <div className={classes.dropdownContainer}>
      <Dropdown
        overlay={menu(
          handleDataFetching,
          dropdownCategories,
          dropdownCategories[activeTimeFrame]
        )}
      >
        <Button>
          {dropdownCategories[activeTimeFrame].content} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default DropdownSelector;
