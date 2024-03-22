import { useForms } from "../../context/FormsContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PieCharts } from "./PieCharts";
import Box from "@mui/material/Box";
import { Loading } from "../Loading";

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
      {analitys.preguntas.map((item) => (
        <div>
          <h5> {item.titulo} </h5>
          <PieCharts analitys={item} />
        </div>
      ))}
    </Box>
  );
}
