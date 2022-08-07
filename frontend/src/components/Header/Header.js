import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { maxWidth } from "@mui/system";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const headersData = [
  {
    label: "FOOD LOG",
    href: "/diary",
  },
  {
    label: "Report",
    href: "/report",
  },
];
const settings = ["Logout"];

const useStyles = makeStyles(() => ({
  header: {
    // backgroundColor: "#464A5D",
    borderStyle: "none",
    minHeight: "60px",
    maxHeight: "60px"
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    // textAlign: "left",
  },
  button: {
    color: "#FFFEFE",
    marginLeft: "38px",
  },
}));

export default function Header({ user, logout }) {
  const { header, logo, button } = useStyles();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const displayDesktop = () => {
    return (
      <Toolbar>
        {calorieTracker}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {getMenuButtons()}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={user.info.name != undefined ? user.info.name : ""}
                src="/static/images/avatar/2.jpg"
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography  onClick={logout}>
                  {setting}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    );
  };

  const calorieTracker = (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Typography variant="h6" component="h1" className={logo}>
        CalorieTracker
      </Typography>
    </Link>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            to: href,
            component: Link,
          }}
          className={button}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar position="relative" className={header}>
        {displayDesktop()}
      </AppBar>
    </header>
  );
}
