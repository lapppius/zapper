import { NavLink, useNavigate } from "react-router-dom";
import styles from "./TopNavBar.module.css";
import { useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { DisplaySettings } from "@mui/icons-material";

export default function TopNavBar() {
  let [curUser, setCurUser] = useState(undefined);
  const authContext = useAuth();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };
  const profile = () => {
    navigate("/Profile");
  };
  useEffect(() => {
    setCurUser(authContext.currentUser);
  }, [authContext]);

  return (
    <>
      <header className={styles.header}>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={(navData) =>
                  navData.isActive ? styles.active : undefined
                }
              >
                Ραδιόφωνα
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={(navData) =>
                  navData.isActive ? styles.active : undefined
                }
              >
                Σχετικά
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/epg"
                className={(navData) =>
                  navData.isActive ? styles.active : undefined
                }
              >
                Πρόγραμμα
              </NavLink>
            </li> */}
          </ul>
          <ul className={styles.LoginSignUpButtons}>
            {curUser === null ? (
              <>
                <li>
                  <NavLink
                    to={"/Login"}
                    className={(navData) =>
                      navData.isActive
                        ? `${styles.active} ${styles.loginButton}`
                        : styles.loginButton
                    }
                  >
                    Login
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/Signup"}
                    className={(navData) =>
                      navData.isActive ? styles.active : undefined
                    }
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            ) : curUser === undefined ? (
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <Box>
                  <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    animation="wave"
                  >
                    <Avatar/>
                  </Skeleton>
                </Box>
              </li>
            ) : curUser !== undefined && curUser.email !== null ? (
              <li>
                {curUser ? (
                  <Box>
                    <Tooltip title={curUser.email}>
                      <IconButton
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        <Avatar
                          src={curUser.photoURL}
                          sx={{ width: 32, height: 32 }}
                        >
                          {curUser ? curUser.email.charAt(0).toUpperCase() : ""}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={(handleClose, profile)}>
                        Profile
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={(handleClose, handleLogout)}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <></>
                )}
              </li>
            ) : (
              "login"
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
