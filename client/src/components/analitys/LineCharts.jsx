import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export function LineCharts({ analitys }) {
  const data = [];
  let totalAcu = 0;
  analitys.respuestas.map((item, i) => {
    totalAcu += analitys.respuestas[i].total;
    data.push({
      name: analitys.respuestas[i].titulo,
      total: totalAcu,
    });
  });
  return (
    <div>
      <LineChart
        data={data}
        width={460}
        height={250}
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          cursor={false}
          labelStyle={{ color: "black" }}
          itemStyle={{ margin: "0rem" }}
        />

        <Line type="monotone" dataKey="total" fill="#8884d8" />
      </LineChart>
      <div style={{ textAlign: "center", color: "black" }}>
        Frecuencia Acumulada
      </div>
    </div>
  );
}
