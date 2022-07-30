import * as React from "react";
import { Paper} from "@mui/material";

import { useSelector, useDispatch } from 'react-redux'
import { postUserLog } from '../../store/userSlice';
import FoodTable from "./FoodTable";
export default function Restaurant() {
  const dispatch = useDispatch();


  return (
    <>
    <div>TESTING</div>
    <FoodTable/>

    </>
  );
}