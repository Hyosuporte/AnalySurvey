import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/AuthContext";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const settings = ["Espacio de Trabajo", "Salir"];

export function MenuUser() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOptionMenu = (setting) => (event) => {
    switch (setting) {
      case "Espacio de Trabajo":
        navigate("/Espacio-de-Trabajo");
        break;
      case "Salir":
        logout();
        break;
    }
    handleCloseUserMenu();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Abrir configuracion">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User" src="" />
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
          <MenuItem key={setting} onClick={handleOptionMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
