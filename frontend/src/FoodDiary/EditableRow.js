import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from 'react-redux'
import { putUserLog } from '../globalSlices/userSlice';

const EditableRow = ({ row, user, handleEditClick }) => {

  const dispatch = useDispatch();

  const submitEdit = (e) => {
    let modifications = [];

    modifications.push(document.querySelector('#desc').value);
    modifications.push(document.querySelector('#calories').value);
    modifications.push(document.querySelector('#fat').value);
    modifications.push(document.querySelector('#carbs').value);
    modifications.push(document.querySelector('#protein').value);

    let newRow = {
      id: row.id,
      name: modifications[0] == '' ? row.name : modifications[0],
      calories: modifications[1] == '' ? row.calories : parseInt(modifications[1]),
      fat: modifications[2] == '' ? row.fat : parseInt(modifications[2]),
      carbs: modifications[3] == '' ? row.carbs : parseInt(modifications[3]),
      protein: modifications[4] == '' ? row.protein : parseInt(modifications[4])
    }

    dispatch(putUserLog(newRow));

    handleEditClick(e, null);

  }

  return (
    <>
      <TableRow>
        <TableCell align="right">
          <TextField
            id="desc"
            type="text"
            required="required"
            placeholder={row.name}
            name="Calories"
            variant="standard"
          ></TextField>
        </TableCell>
        <TableCell align="right">
          <TextField
            id="calories"
            type="number"
            required="required"
            placeholder={row.calories}
            variant="standard"
          ></TextField>
        </TableCell>
        <TableCell align="right">
          <TextField
            id="fat"
            type="number"
            required="required"
            placeholder={row.fat}
            variant="standard"
          ></TextField>
        </TableCell>
        <TableCell align="right">
          <TextField
            id="carbs"
            type="number"
            required="required"
            placeholder={row.carbs}
            name="Calories"
            variant="standard"
          ></TextField>
        </TableCell>
        <TableCell align="right">
          <TextField
            id="protein"
            type="number"
            required="required"
            placeholder={row.protein}
            textAlign="right"
            variant="standard"
          ></TextField>
        </TableCell>
        <TableCell>
          <CheckIcon  onClick={() => submitEdit(event)}/>
          <CloseIcon
            style={{ marginLeft: "2px" }}
            onClick={() => handleEditClick(event, null)}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default EditableRow;
