import { AreaChart, XAxis, Tooltip, Area } from "recharts";

export function LineaAcuAchart({ analitys, show }) {
  const data = [];
  let totalAcu = 0;
  analitys.respuestas.map((item, i) => {
    totalAcu += parseFloat(
      (100 * (analitys.respuestas[i].total / analitys.total)).toFixed(1)
    );
    data.push({
      name: analitys.respuestas[i].titulo,
      total: totalAcu,
    });
  });

  // Default parameter values for props
  show = show ?? false; // if 'show' is undefined, default it to false

  return show ? (
    <div>
      <AreaChart
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

        <Tooltip
          cursor={false}
          labelStyle={{ color: "black" }}
          itemStyle={{ margin: "0rem" }}
        />

        <Area type="monotone" dataKey="total" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
      <div style={{ textAlign: "center", color: "black" }}>
        Frecuencia Relativa Acumulada
      </div>
    </div>
  ) : null;
}
