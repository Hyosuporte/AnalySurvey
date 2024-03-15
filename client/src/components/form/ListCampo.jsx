import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import * as React from "react";

import Avatar from "@mui/material/Avatar";

const Colors = (idColor) => {
  switch (idColor) {
    case 1:
      return "#865DFF !important";
    case 2:
      return "#191825 !important";
    case 3:
      return "#E384FF !important";
  }
};

export function ListP({ data }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (id, index) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setSelectedIndex(index);
  };

  return (
    <List className="ul-horizon">
      <ListItem
        id="content-title"
        secondaryAction={
          <IconButton>
            <AddIcon className="icon-white" sx={{ background: "#865DFF" }} />
          </IconButton>
        }
      >
        <ListItemButton>
          <ListItemText primary="Contenido" />
        </ListItemButton>
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
                bgcolor: Colors(item.tipoPregunta_id),
                "&:hover": {
                  backgroundColor: Colors(item.tipoPregunta_id),
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
