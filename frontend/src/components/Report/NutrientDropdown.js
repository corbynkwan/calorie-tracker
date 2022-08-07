import React, { useState } from "react";
import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useStyles from "./style";
import { nutrientMenu } from "./NutrientItem";


const nutrientDropdownCategories = [
  {
    key: 0,
    content: "Calories",
    value: "calories"
  },
  {
    key: 1,
    content: "Fat",
    value: "fat"
  },
  {
    key: 2,
    content: "Carbs",
    value: "carbs"
  },
  {
    key: 3,
    content: "Protein",
    value: "protein"
  }
];

export const NutrientDropdown = ({ setNutrientGraph }) => {
  const classes = useStyles();
  const [activeNutrientSelection, setactiveNutrientSelection] = useState(0);


  const handleDataFetching = (key, value) => {
    setactiveNutrientSelection(key);
    setNutrientGraph(value);
  };

  return (
    <div className={classes.nutrientDropdownContainer}>
      <Dropdown
        overlay={nutrientMenu(
          handleDataFetching,
          nutrientDropdownCategories,
          nutrientDropdownCategories[activeNutrientSelection]
        )}
      >
        <Button>
          {nutrientDropdownCategories[activeNutrientSelection].content} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default NutrientDropdown;
