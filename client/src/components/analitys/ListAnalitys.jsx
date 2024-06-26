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
      {analitys.preguntas.map((item, i) => (
        <div className="container-campo-resul" key={i}>
          <h5> {item.titulo} </h5>
          <div className="container-charts">
            {item.tipoPregunta != 4 ? (
              <>
                <PieCharts key={`pie-${i}`} analitys={item} />
                <BarCharts key={`bar-${i}`} analitys={item} />
              </>
            ) : null}
            {item.tipoPregunta == 4 ? (
              <RadarCharts analitys={item} key={`radar-${i}`} />
            ) : null}
          </div>
        </div>
      ))}
    </Box>
  );
}
