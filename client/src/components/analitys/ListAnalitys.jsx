import { useForms } from "../../context/FormsContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BarCharts } from "./BarCharts";
import { PieCharts } from "./PieCharts";
import { Loading } from "../Loading";
import Box from "@mui/material/Box";
import RadarCharts from "./RadarCharts";

export function ListAnalitys() {
  const { charts, analitys } = useForms();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    charts(id).then(() => {
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <Box classtitulo="list-analitys">
      <h2>Resultados</h2>
      {/* /* FIXME:Poner la validacion de que no liste las barras ni los pies cuando son de tipo 4 las preguntas /*  */}
      {analitys.preguntas.map((item, i) => (
        <div key={i}>
          <h5> {item.titulo} </h5>
          <PieCharts key={`pie-${i}`} analitys={item} />
          <BarCharts key={`bar-${i}`} analitys={item} />
          {item.tipoPregunta == 4 ? (
            <RadarCharts analitys={item} key={`radar-${i}`} />
          ) : null}
        </div>
      ))}
    </Box>
  );
}
