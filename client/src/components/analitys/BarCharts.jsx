import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function BarCharts({ analitys }) {
  const data = [];
  analitys.respuestas.map((item, i) => {
    data.push({
      name: analitys.respuestas[i].titulo,
      total: analitys.respuestas[i].total,
    });
  });
  return (
    <ResponsiveContainer className="bar-chart" width="50%" aspect={1.9}>
      <BarChart
        data={data}
        width="40%"
        heigth="80%"
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#6b48ff" />
      </BarChart>
    </ResponsiveContainer>
  );
}
