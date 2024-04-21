import Box from "@mui/material/Box";
import { MultipleOption } from "../typeAsk/MultipleOption";
import { TextOption } from "../typeAsk/TextOption";
import { CheckOption } from "../typeAsk/CheckOption";
import { RatinOptino } from "../typeAsk/RatinOption";

export function FormEdit({ data }) {
  return (
    <Box className="form-Edit" component="form">
      {data.map((item) => {
        switch (item.tipoPregunta) {
          case 1:
            return <MultipleOption key={item.id} question={item} />;
          case 2:
            return <TextOption key={item.id} question={item} />;
          case 3:
            return <CheckOption key={item.id} question={item} />;
          case 4:
            return <RatinOptino key={item.id} question={item} />;
        }
      })}
    </Box>
  );
}
