import * as React from "react";
import AppBar from "@mui/material/AppBar";
import styled from 'styled-components'
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import CustomizedMenus from "../registration/MenuUsuario";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from 'react-icons/ai'

const pages = ["Portfolio", "History"];

const settings = ["Profile", "Account", "Wallet", "Exit"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const HandleLogOut = () => {
    console.log("wooooo");
    navigate("/LogOut");
  };

  const handleClose = () => {
    navigate("/AccountPage");
  };

  console.log(sessionStorage.getItem("username") === null)

  return (
    <AppBar position="static">
      <Container
        maxWidth="100%"
        sx={{
          backgroundColor: "black",
          position: "fixed",
          zIndex: "100",
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            fontFamily="Digitalism"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Cryptonita
          </Typography>
          <Box
            sx={{
              justifyContent: "center",
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {!sessionStorage.getItem("username") ? null : pages.map((page) => (
              <Link to={`/${page}`}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontFamily: "Centra",
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          {sessionStorage.getItem("username") ? (
            <Box sx={{ textAlign: "right", flexGrow: 1 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Link to={"/Logout"}>
                  <SelectCoinButton>
                    Logout
                  </SelectCoinButton>
                </Link>
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ textAlign: "right", flexGrow: 1 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Link to={"/login"}>
                  <SelectCoinButton>
                    Login
                  </SelectCoinButton>
                </Link>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;


const SelectCoinButton = styled.button`
    background-color: rgb(33, 114, 229);
    border-radius: 20px;
    font-size: 18px;
    color: white;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    width: 100px;
    height: 38px;
    transition: transform 2s ease 2s;

    &:hover {
        background-color: rgb(33, 114, 229, 0.8);
      }
`