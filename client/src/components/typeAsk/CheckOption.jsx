import { useForms } from "../../context/FormsContext";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";

export function CheckOption({ question }) {
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
      location.reload();
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
      <h5 htmlFor="question-text">Pregunta:</h5>
      <TextField
        type="text"
        defaultValue={question.titulo}
        fullWidth
        color="secondary"
        autoComplete="off"
        onChange={(e) => handleChangeQuestion(e.target.value)}
        onBlur={() => handleBlurTitle(question.id)}
      />
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <input
              type="text"
              value={option.titulo}
              onChange={(e) => handleChangeOption(index, e.target.value)}
              onBlur={() => handleBlurOption(index)}
            />
            <button onClick={() => handleRemoveOption(index, option.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddOption}>Agregar opción</button>
    </Box>
  );
}
