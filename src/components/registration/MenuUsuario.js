import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import AccountPage from "../pages/AccountPage";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function PositionedMenu() {
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
  const handleCloser = () => {
    navigate("/CustomersPage");
  };

  return (
    <>
      <Button
        startIcon={<ArrowDropDownIcon fontSize="small" />}
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        variant="contained"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        User
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleCloser}>Account</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={HandleLogOut}>Logout</MenuItem>
      </Menu>
    </>
  );
  
}
