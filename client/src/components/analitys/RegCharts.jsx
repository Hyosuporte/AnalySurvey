import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Scatter,
} from "recharts";

export function RegCharts({ analitys, show }) {
  const data = [];
  analitys.respuestas.map((item, i) => {
    data.push({
      name: i + 1,
      total: analitys.respuestas[i].total,
      limit: parseFloat(analitys.respuestas[i].regression).toFixed(1),
    });
  });
  return show ? (
    <div>
      <ComposedChart
        width={460}
        height={250}
        data={data}
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="black" />
        <XAxis dataKey="name" />
        <YAxis />
        <Scatter dataKey="total" fill="blue" />
        <Line dataKey="limit" stroke="red" />
      </ComposedChart>
      <div style={{ textAlign: "center", color: "black" }}>
        Regresion Lineal
      </div>
    </div>
  ) : null;
}
