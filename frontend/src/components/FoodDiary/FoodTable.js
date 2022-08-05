import * as React from "react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { useState } from "react";

let rows = [];
let dailyGoal = {
  calories: "1500",
  fat: "50",
  carbs: "180",
  protein: "80",
};
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    description: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "calories",
    description: false,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    description: false,
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    description: false,
    disablePadding: false,
    label: "Carbs (g)",
  },
  {
    id: "protein",
    description: false,
    disablePadding: false,
    label: "Protein (g)",
  },
  {
    id: "edit",
    description: false,
    disablePadding: false,
    label: "Edit",
  },
  {
    id: "delete",
    description: false,
    disablePadding: false,
    label: "Delete",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.description ? "left" : "right"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === "edit" || headCell.id === "delete" ? (
              <div>{headCell.label}</div>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={
                  headCell.id === "edit" || headCell.id === "delete"
                    ? false
                    : createSortHandler(headCell.id)
                }
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

//Reference: https://mui.com/material-ui/react-table/

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const { user, editEvent, deleteEvent } = props;
  rows = user.log;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editedRow, setEditedRow] = useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleEditClick = (event, row) => {
    event.preventDefault();
    row ? setEditedRow(row.id) : setEditedRow(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const sum = (col) => {
    return rows
      .map((row) => row[col])
      .reduce((sum, colValue) => sum + parseInt(colValue), 0);
  };

  let calorieTotal = sum("calories");
  let fatTotal = sum("fat");
  let carbsTotal = sum("carbs");
  let proteinTotal = sum("protein");
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ maxWidth: 50 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <Fragment>
                      {editedRow === row.id ? (
                        <EditableRow
                          row={row}
                          user={user}
                          editToggle={handleEditClick}
                          editEvent={editEvent}
                        />
                      ) : (
                        <ReadOnlyRow
                          row={row}
                          editToggle={handleEditClick}
                          deleteEvent={deleteEvent}
                        />
                      )}
                    </Fragment>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              <TableRow style={{"borderWidth":"3px", 'borderColor':"#aaaaaa", 'borderTopStyle':'solid'}}>
                <TableCell><strong>Totals</strong></TableCell>
                <TableCell align="right">{calorieTotal}</TableCell>
                <TableCell align="right">{fatTotal}</TableCell>
                <TableCell align="right"> {carbsTotal}</TableCell>
                <TableCell align="right"> {proteinTotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Daily Goal</strong></TableCell>
                <TableCell align="right">{dailyGoal.calories}</TableCell>
                <TableCell align="right">{dailyGoal.fat}</TableCell>
                <TableCell align="right">{dailyGoal.carbs}</TableCell>
                <TableCell align="right">{dailyGoal.protein}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Remaining</strong></TableCell>
                <TableCell align="right" style={{color: "green"}}>
                  {dailyGoal.calories - calorieTotal}
                </TableCell>
                <TableCell align="right" style={{color: "green"}}>
                  {dailyGoal.fat - fatTotal}
                </TableCell>
                <TableCell align="right" style={{color: "green"}}>
                  {dailyGoal.carbs - carbsTotal}
                </TableCell>
                <TableCell align="right" style={{color: "green"}}>
                  {dailyGoal.protein - proteinTotal}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
