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
    <div style={{ width: "100%", height: 500 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="total"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
