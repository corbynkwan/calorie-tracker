import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from "@mui/icons-material/Edit";

import { useSelector, useDispatch } from 'react-redux'
import { deleteUserLog } from '../globalSlices/userSlice';

const ReadOnlyRow = ({ row, handleEditClick}) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteUserLog(row.id));
  }

  return (
    <>
      <TableRow>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
        <TableCell align="right">
          <EditIcon  color="action" fontSize="medium" onClick={(event) => handleEditClick(event, row)}/>
        </TableCell>
        <TableCell align="center">
          <DeleteIcon  color="action" fontSize="medium" onClick={handleDeleteClick}/>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ReadOnlyRow;
