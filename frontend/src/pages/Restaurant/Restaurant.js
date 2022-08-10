import * as React from "react";
import { Paper} from "@mui/material";
import {useLocation} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { postUserLog } from '../../store/userSlice';
import FoodTable from "./FoodTable";
import Header from "../../components/Header/Header";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function Restaurant(props) {
  const dispatch = useDispatch();
  let query = useQuery();

  return (
    <>
    <Header user={props.user} logout={props.logout}/>
    <div>TESTING</div>
    <FoodTable id={query.get("id")}/>

    </>
  );
}