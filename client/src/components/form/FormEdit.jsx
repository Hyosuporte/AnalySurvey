import Box from "@mui/material/Box";
import { MultipleOption } from "../typeAsk/MultipleOption";
import { TextOption } from "../typeAsk/TextOption";
import { CheckOption } from "../typeAsk/CheckOption";
import { RatinOptino } from "../typeAsk/RatinOption";

export function FormEdit({ data }) {
  return (
    <Box className="form-Edit" component="form">
      {data.map((item, i) => {
        switch (item.tipoPregunta) {
          case 1:
            return <MultipleOption key={i} question={item} />;
          case 2:
            return <TextOption key={i} question={item} />;
          case 3:
            return <CheckOption key={i} question={item} />;
          case 4:
            return <RatinOptino key={i} question={item} />;
          case 5:
            return <h1>Tipo 5</h1>;
        }
      })}
    </Box>
  );
}
