import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useForms } from "../../context/FormsContext";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { UpdateTitle } from "../UpdateTitle";
import Menu from "@mui/material/Menu";
import { useState } from "react";

const options = ["Abrir", "Share", "Renombrar", "Duplicar", "Eliminar"];

export function LogMenu({ id, title, alert }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { deleteForm, duplicateForm } = useForms();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    switch (option) {
      case "Abrir":
        navigate(`/survey/create/${id}`);
        break;
      case "Share":
        navigator.clipboard
          .writeText(`http://localhost:5173/forms/${id}`)
          .then(() => {
            alert(true);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Renombrar":
        setModalOpen(true);
        break;
      case "Duplicar":
        duplicateForm(id);
        break;
      case "Eliminar":
        deleteForm(id);
        break;
    }
    setAnchorEl(null);
  };
  return (
    <div className="div-more">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <UpdateTitle
        id={id}
        open={modalOpen}
        title={title}
        setOpen={setModalOpen}
      />
    </div>
  );
}
