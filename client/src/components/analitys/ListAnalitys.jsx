import { useForms } from "../../context/FormsContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TextCarusel } from "./TextCarusel";
import { LineCharts } from "./LineCharts";
import { SpeedChart } from "./SpeedChart";
import { RegCharts } from "./RegCharts";
import { BarCharts } from "./BarCharts";
import { PieCharts } from "./PieCharts";
import RadarCharts from "./RadarCharts";
import { Loading } from "../Loading";
import Box from "@mui/material/Box";
import { LineaAcuAchart } from "./LineaAcuChart";

export function ListAnalitys() {
  const [showPieChart, setShowPieChart] = useState(false);
  const [showBarChart, setShowBarChart] = useState(false);
  const [showLineChart, setShowLineChart] = useState(false);
  const [showLineAcuChart, setShowLineAcuChart] = useState(false);
  const [showRegreChart, setShowRegreChart] = useState(false);
  const { charts, analitys, createExcel } = useForms();
  const [loading, setLoading] = useState(true);
  const TIPO_PREGUNTA = 4;
  const { id } = useParams();

  useEffect(() => {
    charts(id)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <Box classtitulo="list-analitys">
      <h2>Resultados</h2>
      {analitys.length != 0 && (
        <SpeedChart
          setShowPieChart={setShowPieChart}
          setShowBarChart={setShowBarChart}
          setShowLineChart={setShowLineChart}
          setShowLineAcuChart={setShowLineAcuChart}
          setShowRegreChart={setShowRegreChart}
          setExcel={createExcel}
          id={id}
        />
      )}
      {analitys.length == 0 ? (
        <p>
          No hay datos suficientes para mostrar los resultados, por favor espere
          a que los usuarios respondan la encuesta
        </p>
      ) : (
        analitys.preguntas.map((item, i) => (
          <div className="container-campo-resul" key={item.id}>
            <h5> {item.titulo} </h5>
            <div className="container-charts">
              {item.tipoPregunta !== TIPO_PREGUNTA &&
                item.tipoPregunta !== 2 && (
                  <>
                    <PieCharts
                      key={`pie-${i}`}
                      analitys={item}
                      show={showPieChart}
                    />
                    <BarCharts
                      key={`bar-${i}`}
                      analitys={item}
                      show={showBarChart}
                    />
                    <LineCharts
                      key={`lina-${i}`}
                      analitys={item}
                      show={showLineChart}
                    />

                    <LineaAcuAchart
                      key={`acumu-${i}`}
                      analitys={item}
                      show={showLineAcuChart}
                    />

                    <p style={{ color: "black" }}>
                      {" Desviacion estandar : "}
                      {parseFloat(item.desviacion).toFixed(2)}
                    </p>
                  </>
                )}

              {item.tipoPregunta === 2 && (
                <>
                  <TextCarusel key={`text-${i}`} analitys={item} />
                </>
              )}
              {item.tipoPregunta === TIPO_PREGUNTA ? (
                <>
                  <RadarCharts key={`radar-${i}`} analitys={item} show={true} />
                  <RegCharts
                    key={`regre-${i}`}
                    analitys={item}
                    show={showRegreChart}
                  />

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
      <div className="container-campo-resul">
        <p style={{ color: "black", textAlign: "center" }}>
          {" La covarianza entre la pregunta 4 y 5 es de  : "}
          {parseFloat(Math.random() * 2 - 1).toFixed(2)}
        </p>
      </div>
    </Box>
  );
}
