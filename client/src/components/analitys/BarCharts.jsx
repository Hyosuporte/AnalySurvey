import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

export function BarCharts({ analitys }) {
  const data = [];
  analitys.respuestas.map((item, i) => {
    data.push({
      name: analitys.respuestas[i].titulo,
      total: analitys.respuestas[i].total,
    });
  });
  return (
    <div>
      <BarChart
        data={data}
        width={500}
        height={250}
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        
        <Bar dataKey="total" fill="#6b48ff" />
      </BarChart>
      <div style={{ textAlign: "center", color: "black" }}>Frecuencia Absoluta</div>
    </div>
  );
}
