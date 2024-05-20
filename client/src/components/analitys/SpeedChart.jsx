import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDial from "@mui/material/SpeedDial";

const handleClick = (action, value, id) => {
  switch (value) {
    case "PieChart":
      action((prevState) => !prevState);
      break;
    case "BarChart":
      action((prevState) => !prevState);
      break;
    case "LineChart":
      action((prevState) => !prevState);
      break;
    case "LineAcumChart":
      action((prevState) => !prevState);
      break;
    case "ExcelChart":
      action(id);
      break;
  }
};

export function SpeedChart({
  setShowPieChart,
  setShowBarChart,
  setShowLineChart,
  setShowLineAcuChart,
  setShowRegreChart,
  setExcel,
  id,
}) {
  const actions = [
    {
      icon: <DonutLargeIcon key="Torta" />,
      name: "Grafico de Torta",
      function: setShowPieChart,
      operation: "PieChart",
    },
    {
      icon: <LeaderboardIcon key="Bar" />,
      name: "Grafico de Bar",
      function: setShowBarChart,
      operation: "BarChart",
    },
    {
      icon: <ShowChartIcon key="Lineal" />,
      name: "Grafico Lineal",
      function: setShowLineChart,
      operation: "LineChart",
    },
    {
      icon: <TrendingUpIcon key="LinealAcum" />,
      name: "Frecuencia Relativa Acumulada",
      function: setShowLineAcuChart,
      operation: "LineAcumChart",
    },
    {
      icon: <ScatterPlotIcon key="Regresion" />,
      name: "Grafico Regresion",
      function: setShowRegreChart,
      operation: "LineChart",
    },
    {
      icon: <FilePresentIcon key="Excel" />,
      name: "Generar Excel",
      function: setExcel,
      operation: "ExcelChart",
    },
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDialog Chart"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      FabProps={{ color: "secondary" }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            handleClick(action.function, action.operation, id);
          }}
        />
      ))}
    </SpeedDial>
  );
}
