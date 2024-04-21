import AdsClickIcon from "@mui/icons-material/AdsClick";
import { useForms } from "../../context/FormsContext";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";

export function MultipleOption({ question }) {
  const [options, setOptions] = useState(question.opciones);
  const [title, setTitle] = useState(question.titulo);
  const { updateCampo, createOption, deleteOption, updateOpcion } = useForms();

  const handleAddOption = () => {
    const data = {
      titulo: "nueva opcion",
      valor: "nueva opcion",
    };
    if (createOption(question.id, data)) {
      setOptions([...options, data]);
    }
  };

  const handleRemoveOption = (index, id) => {
    if (deleteOption(id)) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const handleChangeOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index].titulo = value;
    newOptions[index].valor = value;
    setOptions(newOptions);
  };

  const handleBlurOption = (index) => {
    const newOptions = [...options];
    updateOpcion(newOptions[index]);
  };

  const handleChangeQuestion = (value) => {
    setTitle(value);
  };

  const handleBlurTitle = (id) => {
    question.titulo = title;
    updateCampo(id, question);
  };

  return (
    <Box className="container-campo" id={question.id}>
      <div className="container-titulo-quest">
        <h4 htmlFor="question-text">
          <AdsClickIcon sx={{ color: "#865dff" }} fontSize="medium" />{" "}
          {question.orden}
        </h4>
        <TextField
          type="text"
          defaultValue={question.titulo}
          label="Opcion unica"
          variant="standard"
          color="secondary"
          autoComplete="off"
          className="question-input"
          onChange={(e) => handleChangeQuestion(e.target.value)}
          onBlur={() => handleBlurTitle(question.id)}
        />
      </div>
      <div className="container-options-quest">
        <ul className="ul-horizon">
          {options.map((option, index) => (
            <li key={index}>
              <input
                type="text"
                value={option.titulo}
                className="option-input"
                onChange={(e) => handleChangeOption(index, e.target.value)}
                onBlur={() => handleBlurOption(index)}
              />
              <IconButton
                className="button-option-d"
                onClick={() => handleRemoveOption(index, option.id)}
              >
                <ClearIcon sx={{ color: "#ff00009c" }} />
              </IconButton>
            </li>
          ))}
        </ul>
        <Button
          variant="outlined"
          color="secondary"
          className="button-option-a"
          onClick={handleAddOption}
        >
          Agregar opción
        </Button>
      </div>
    </Box>
  );
}
