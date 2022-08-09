import * as React from "react";
import { Paper} from "@mui/material";
import {useLocation} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { postUserLog } from '../../store/userSlice';
import FoodTable from "./FoodTable";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function Restaurant() {
  const dispatch = useDispatch();
  let query = useQuery();

  return (
    <>
    <FoodTable id={query.get("id")}/>

    </>
  );
}