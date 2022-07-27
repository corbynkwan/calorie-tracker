import * as React from "react";
import { Paper} from "@mui/material";
import CustomFoodGrid from "../../components/CustomFood/CustomFoodGrid";

import { useSelector, useDispatch } from 'react-redux'
import { postUserLog } from '../../store/userSlice';
import SearchBar from "material-ui-search-bar";
 

const AddFood = () => {
  const dispatch = useDispatch();

  return (
    <>
       <div>
       <SearchBar
            value={this.state.value}
            onChange={(newValue) => this.setState({ value: newValue })}
            onRequestSearch={() => doSomethingWith(this.state.value)}
        />
        Hello World
       </div>
    </>
  );
}
export default AddFood;