import styled from "styled-components";
import React from "react";
import Coin from "./Coin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { Navigate } from "react-router-dom";

const limitPage = 9;

const theme = createTheme({
  components: {
    // Name of the component
    MuiPaginationItem: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: "#fff",
        },
      },
    },
  },
  palette: {
    primary: {
      main: blue[500],
      contrastText: "#fff",
    },
    secondary: {
      main: red[500],
      contrastText: "#fff",
    },
  },
});

const TableCoins = ({ coins }) => {
  const [status, setStatus] = useState([]);
  const [items, setItems] = useState(null);
  const [page, setPage] = React.useState(1);
  const [click, setClicked] = useState(null);

  let totalSize = coins.length;
  let totalPages = Math.ceil(totalSize / limitPage);
  let currentPage = 0;

  useEffect(() => {
    console.log(coins);
    setItems(coins.slice(0, limitPage));
  }, [coins]);

  const handlePageClick = async (event, value) => {
    console.log(value);
    currentPage = value - 1;
    setPage(value);

    setItems(
      coins.slice(
        currentPage * limitPage,
        Math.min(currentPage * limitPage + limitPage),
        totalSize
      )
    );
  };

  if (click) {
    return <Navigate to={"/coinInfo/" + click.id}></Navigate>
}

  return (
    <Wrapper>
      <Content>
        <PortfolioTable>
          <Divider />
          <Table className="table-dark mt-4 table-hover">
            <TableItem>
              <TableRow>
                <div style={{ flex: 2 }}>Name</div>
                <div style={{ flex: 2 }}>Price</div>
                <div style={{ flex: 2 }}>Cap.Market</div>
                <div style={{ flex: 2 }}>Last 7 days</div>
                <div style={{ flex: 0, color: "#0a0b0d" }}></div>
              </TableRow>
            </TableItem>
            <Divider />
            <div>
              {totalSize === 0 ? (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              ) : (
                items.map((coin) => (
                  <div key={coin.id} onClick={() => setClicked(coin)}>
                      <Coin coin={coin} />
                    <Divider />
                  </div>
                ))
              )}
            </div>
          </Table>
        </PortfolioTable>

        <Stack spacing={2}>
          <ThemeProvider theme={theme}>
            <Pagination
              className="paginationcripto"
              color="primary"
              variant="outlined"
              count={totalPages}
              page={page}
              onChange={handlePageClick}
              showFirstButton
              showLastButton
              sx={{
                justifyContent: "center",
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                marginTop: 4,
              }}
            />
          </ThemeProvider>
        </Stack>
      </Content>
    </Wrapper>
  );
};

export default TableCoins;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;
`;
const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem 1rem;
`;

const Balance = styled.div``;

const BalanceTitle = styled.div`
  color: #8a919e;
  font-size: 0.9rem;
`;

const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
`;

const PortfolioTable = styled.div`
  margin-top: 1rem;
  border: 1px solid #282b2f;
`;

const Table = styled.div`
  width: 100%;
`;

const TableRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & > th {
    text-align: left;
  }
`;

const TableItem = styled.div`
  padding: 1rem 2rem;
`;

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const color = red[500];
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});
