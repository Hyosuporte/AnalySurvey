import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import { useForms } from "../../context/FormsContext";

const Colors = (idColor) => {
  switch (idColor) {
    case 1:
      return "#865DFF !important";
    case 2:
      return "#191825 !important";
    case 3:
      return "#E384Fc !important";
  }
};

export function ListP({ data, formId }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const { createCampo } = useForms();

  const handleListItemClick = (id, index) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setSelectedIndex(index);
  };

  const handleAddButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (value) => {
    if (createCampo(value, formId, data.length)) {
      //location.reload();
    }
    setAnchorEl(null);
  };

  return (
    <List className="list-Campos">
      <ListItem
        id="content-title"
        secondaryAction={
          <IconButton onClick={handleAddButtonClick}>
            <AddIcon className="icon-white" sx={{ background: "#865DFF" }} />
          </IconButton>
        }
      >
        <ListItemButton>
          <ListItemText primary="Contenido" />
        </ListItemButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={() => handleCloseMenu(1)}>
            Opcion Multiple
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu(2)}>Abierta</MenuItem>
          <MenuItem onClick={() => handleCloseMenu(3)}>Check</MenuItem>
          <MenuItem onClick={() => handleCloseMenu(4)}>Calificacion</MenuItem>
        </Menu>
      </ListItem>
      {data.map((item, i) => (
        <ListItem
          key={i}
          selected={selectedIndex === i}
          onClick={() => handleListItemClick(item.id, i)}
          secondaryAction={
            <IconButton>
              <DeleteIcon className="icon-red" />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar
              className="orden-p"
              variant="rounded"
              sx={{
                bgcolor: Colors(item.tipoPregunta),
                "&:hover": {
                  backgroundColor: Colors(item.tipoPregunta),
                },
              }}
            >
              {item.orden}
            </Avatar>
          </ListItemAvatar>
          <ListItemButton>
            <ListItemText primary={item.titulo} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
