import { Chart as ChartJS, registerables } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
ChartJS.register(...registerables);

function AUMChart() {
  const labels = ["0%", "20%", "40%", "60%", "80", "100"];
  const [theme, setTheme] = useState("rgb(243, 243, 243)");
  useEffect(() => {
    setTheme(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--secondary-color"
      )
    );
  }, []);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "iBSWN Lorenz Curve",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: theme,
        data: [1, 1.02, 0.97, 0.94, 0.91, 0.87],
      },
    ],
  };

  return (
    <div>
      Hello Codesandbox <Line options={{}} data={data} />
    </div>
  );
}
export default AUMChart;
