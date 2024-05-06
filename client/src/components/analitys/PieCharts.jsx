import { Pie, PieChart, Cell, Tooltip } from "recharts";

export function PieCharts({ analitys }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const data = [];
  analitys.respuestas.map((item, i) => {
    data.push({
      name: analitys.respuestas[i].titulo,
      total: parseFloat(
        (100 * (analitys.respuestas[i].total / analitys.total)).toFixed(1)
      ),
    });
  });

  return (
    <div>
      <PieChart width={200} height={200}>
        <Pie
          dataKey="total"
          data={data}
          cx="50%"
          cy="40%"
          innerRadius={40}
          outerRadius={60}
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div style={{ textAlign: "center", color: "black" }}>
        Frecuencia Relativa
      </div>
    </div>
  );
}
