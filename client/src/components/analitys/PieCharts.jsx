import { ResponsiveContainer, Pie, PieChart, Cell, Tooltip } from "recharts";

export function PieCharts({ analitys }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const data = [];
  analitys.respuestas.map((item, i) => {
    data.push({
      name: analitys.respuestas[i].titulo,
      total: 100 * (analitys.respuestas[i].total / analitys.total),
    });
  });

  return (
    <ResponsiveContainer width="30%" aspect={1}>
      <PieChart>
        <Pie
          dataKey="total"
          data={data}
          cx="50%"
          cy="40%"
          innerRadius={40}
          outerRadius={60}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
