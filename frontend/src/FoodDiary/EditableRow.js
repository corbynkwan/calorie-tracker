import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
const EditableRow = ({ row, handleEditClick }) => {
  return (
    <>
      <TableRow>
        <TableCell align="right">
          <TextField
            type="text"
            required="required"
            placeholder={row.name}
            name="Calories"
            variant="standard"
          ></TextField>
        </TableCell>
        <TableCell align="right">
          <TextField
            type="number"
            required="required"
            placeholder={row.calories}
            variant="standard"
          ></TextField>
        </TableCell>
        <TableCell align="right">
          <TextField
            type="number"
            required="required"
            placeholder={row.fat}
            variant="standard"
          ></TextField>
        </TableCell>
        <TableCell align="right">
          <TextField
            type="number"
            required="required"
            placeholder={row.carbs}
            name="Calories"
            variant="standard"
          ></TextField>
        </TableCell>
        <TableCell align="right">
          <TextField
            type="number"
            required="required"
            placeholder={row.protein}
            textAlign="right"
            variant="standard"
          ></TextField>
        </TableCell>
        <TableCell>
          <CheckIcon />
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
