import * as React from "react";
import { Paper} from "@mui/material";
import CustomFoodGrid from "../../components/CustomFood/CustomFoodGrid";

import { useSelector, useDispatch } from 'react-redux'
import { postUserLog } from '../../store/userSlice';
import SearchBar from "material-ui-search-bar";
import FoodTable from "./FoodTable";
export default function FoodDirectory() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState("");
  const submitEvent = (newRow) => {
    dispatch(postUserLog(newRow));
  }

  return (
    <>
    <div>TESTING</div>
      <SearchBar
      value={searchValue}
      onChange={(newValue) => setSearchValue(newValue)}
      onRequestSearch={() => console.log('something')}
    />
    <FoodTable/>
       
    </>
  );
}
