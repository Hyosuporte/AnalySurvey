import { NavbarProfile } from "../components/profile/NavbarProfile";
import { GridView } from "../components/profile/GridView";
import { ListView } from "../components/profile/ListView";
import { useEffect, useState } from "react";
import { useForms } from "../context/FormsContext";
import { OptionViews } from "../components/profile/OptionViews";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export function Profile() {
  const { forms, getForms } = useForms();
  const [alignment, setAligment] = useState("Grid");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getForms();
  }, []);

  return (
    <main id="mainProfile">
      <NavbarProfile />
      <OptionViews setAligment={setAligment} />
      {alignment == "Grid" ? (
        <GridView data={forms} alert={setOpen} />
      ) : (
        <ListView data={forms} alert={setOpen} />
      )}
      <Box className="alert-clipboard">
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            }
          >
            Link copiado al clipboard
          </Alert>
        </Collapse>
      </Box>
    </main>
  );
}
