import {
  Bar,
  BarChart,
  CartesianGrid,
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
    <ResponsiveContainer width="50%" aspect={2} >
      <BarChart data={data} width={500} heigth={300}>
        <CartesianGrid strokeDasharray="4 1 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#6b48ff" />
      </BarChart>
    </ResponsiveContainer>
  );
}
