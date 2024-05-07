import { useForms } from "../../context/FormsContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { LineCharts } from "./LineCharts";
import { RegCharts } from "./RegCharts";
import { BarCharts } from "./BarCharts";
import { PieCharts } from "./PieCharts";
import RadarCharts from "./RadarCharts";
import { Loading } from "../Loading";
import Box from "@mui/material/Box";

export function ListAnalitys() {
  const [showPieChart, setShowPieChart] = useState(false);
  const [showBarChart, setShowBarChart] = useState(false);
  const [showLineChart, setShowLineChart] = useState(false);
  const [showRegreChart, setShowRegreChart] = useState(false);
  const { charts, analitys, createExcel } = useForms();
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
      <Box>
        <Button onClick={() => createExcel(id)}> Generar excel </Button>{" "}
        <input
          type="checkbox"
          value="Pie Chart"
          name="PieChart"
          onChange={() => setShowPieChart(!showPieChart)}
        />
        <label htmlFor="PieChart">Pie Chart</label>
        <input
          type="checkbox"
          value="Bar Chart"
          name="BarChart"
          onChange={() => setShowBarChart(!showBarChart)}
        />
        <label htmlFor="BarChart">Bar Chart</label>
        <input
          type="checkbox"
          value="Line Chart"
          name="LineChart"
          onChange={() => setShowLineChart(!showLineChart)}
        />
        <label htmlFor="BarChart">Line Chart</label>
        <input
          type="checkbox"
          value="Regresion Chart"
          name="regresionChart"
          onChange={() => setShowRegreChart(!showRegreChart)}
        />
        <label htmlFor="regresionChart">Regresion lineal</label>
      </Box>
      {analitys.length == 0 ? (
        <p>
          No hay datos suficientes para mostrar los resultados, por favor espere
          a que los usuarios respondan la encuesta
        </p>
      ) : (
        analitys.preguntas.map((item, i) => (
          <div className="container-campo-resul" key={i}>
            <h5> {item.titulo} </h5>
            <div className="container-charts">
              {item.tipoPregunta != 4 ? (
                <>
                  {showPieChart && (
                    <PieCharts key={`pie-${i}`} analitys={item} />
                  )}
                  {showBarChart && (
                    <BarCharts key={`bar-${i}`} analitys={item} />
                  )}
                  {showLineChart && (
                    <LineCharts key={`acumu-${i}`} analitys={item} />
                  )}
                  <p style={{ color: "black" }}>
                    {" Desviacion estandar : "}
                    {parseFloat(item.desviacion).toFixed(2)}
                  </p>
                </>
              ) : null}
              {item.tipoPregunta == 4 ? (
                <>
                  <RadarCharts key={`radar-${i}`} analitys={item} />
                  {showRegreChart && (
                    <RegCharts key={`regre-${i}`} analitys={item} />
                  )}
                  <p style={{ color: "black" }}>
                    {" Correlacion : "}
                    {parseFloat(item.correlacion).toFixed(2)} <br />
                    {" Desviacion estandar : "}
                    {parseFloat(item.desviacion).toFixed(2)}
                  </p>
                </>
              ) : null}
            </div>
          </div>
        ))
      )}
    </Box>
  );
}
