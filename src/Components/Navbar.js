import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addBookInCart } from "../Redux/Actions/cart";
import { logout } from "../Redux/Actions/user";
import { fetchBooks } from "../Redux/Actions/books";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.user);
  const settings = [
    {
      name: "My Profile",
      route: "profile",
      visible: true,
    },
    {
      name: "Publish Book",
      route: "publish",
      visible: user.isVendor || user.isAdmin,
    },
    {
      name: "Manage Books",
      route: "managebooks",
      visible: user.isVendor || user.isAdmin,
    },
    {
      name: "Manage Users",
      route: "admin/manageusers",
      visible: user.isAdmin,
    },
    {
      name: "My Orders",
      route: "myorders",
      visible: true,
    },
    {
      name: "Logout",
      visible: true,
    },
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  let cart = useSelector((state) => state?.cart?.books);
  return (
    <>
      <Box
        sx={{
          height: "64px",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontFamily: "montserrat",
            fontWeight: 700,
            color: "#777",
            textDecoration: "none",
          }}
        >
          Book Bazaar
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="cart"
            sx={{ mr: 1 }}
            onClick={() => {
              navigate("/cart");
            }}
          >
            <StyledBadge badgeContent={cart?.length} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="Remy Sharp" src="/assets/avatar.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
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
              {settings.map(
                (setting) =>
                  setting.visible && (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => {
                          if (setting.name === "Logout") {
                            dispatch(logout());
                          } else {
                            navigate(`/${setting.route}`);
                          }
                        }}
                      >
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
