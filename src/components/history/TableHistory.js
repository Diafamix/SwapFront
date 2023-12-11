import * as React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

// material-ui
import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

// third-party
import NumberFormat from "react-number-format";

// project import
import Dot from "./Dot";

function createData(trackingNo, name, fat, carbs, protein) {
  return { trackingNo, name, fat, carbs, protein };
}

const rows = [
  createData(84564564, "Bitcoin", 40, 2, 40570),
  createData(98764564, "Ethereum", 300, 0, 180139),
  createData(98756325, "Tether", 355, 1, 90989),
  createData(98652366, "USD Coin", 50, 1, 10239),
  createData(13286564, "BND", 100, 1, 83348),
  createData(86739658, "Binance USD", 99, 0, 410780),
  createData(13256498, "XRP", 125, 2, 70999),
  createData(98753263, "Cardano", 89, 2, 10570),
  createData(98753275, "Salana", 185, 1, 98063),
  createData(98753291, "Polkadot", 100, 0, 14001),
];

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

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "origin",
    numeric: true,
    disablePadding: false,
    label: "Origin",
  },
  {
    id: "destiny",
    numeric: true,
    disablePadding: false,
    label: "Destiny",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = "warning";
      title = "Pending";
      break;
    case 1:
      color = "success";
      title = "Approved";
      break;
    case 2:
      color = "error";
      title = "Rejected";
      break;
    default:
      color = "primary";
      title = "None";
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number,
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState("asc");
  const [orderBy] = useState("trackingNo");
  const [selected] = useState([]);
  const [history, setHistory] = useState(undefined);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = () => {
    axios
      .get(
        "http://localhost:8080/api/history?start=02-09-2021&end=11-12-2023",
        {
          headers: { "Access-Control-Allow-Origin": "*" },
          auth: {
            username: sessionStorage.getItem("username"),
            password: sessionStorage.getItem("password"),
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        setHistory(data.data.data);
      })
      .catch((e) => console.log(e));
  };

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  if (history === undefined) return null;

  return (
    <Box>
      <TableContainer
        sx={{
          width: "95%",
          margin: "0 auto",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            ".css-10dfkli-MuiTableCell-root": { color: "white" },
            ".css-1azl6jz-MuiTableCell-root": { color: "white" },
            ".css-1ygcj2i-MuiTableCell-root": { color: "white" },
            ".css-177gid-MuiTableCell-root": { color: "white" },
            ".css-1ex1afd-MuiTableCell-root": { color: "white" },
            marginTop: "90px",
            "& .MuiTableCell-root:first-child": {
              pl: 2,
            },
            "& .MuiTableCell-root:last-child": {
              pr: 3,
            },
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {history
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.user.username);

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.user.username}
                    selected={isItemSelected}
                  >
                    <TableCell align="left">{row.user.username}</TableCell>
                    <TableCell align="left">{row.origin}</TableCell>
                    <TableCell align="left">{row.destiny}</TableCell>
                    <TableCell align="left">{row.quantity}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
