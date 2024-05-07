import { NavbarProfile } from "../components/dashboard/NavbarProfile";
import { OptionViews } from "../components/dashboard/OptionViews";
import { GridView } from "../components/dashboard/GridView";
import { ListView } from "../components/dashboard/ListView";
import { useForms } from "../context/FormsContext";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const MemoizedGridView = React.memo(GridView);
const MemoizedListView = React.memo(ListView);

export default function Overiew() {
  const { forms, getForms } = useForms();
  const [alignment, setAligment] = useState("Grid");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getForms().catch((error) => {
      console.error("Error al obtener los formularios:", error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!forms) {
    return <p>Cargando...</p>;
  }

  return (
    <main id="mainProfile">
      <NavbarProfile />
      <OptionViews setAligment={setAligment} />
      {alignment === "Grid" ? (
        <MemoizedGridView data={forms} alert={setOpen} />
      ) : (
        <MemoizedListView data={forms} alert={setOpen} />
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
