import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(
  BarElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}
interface ChartProps {
  data: ChartData;
}

const BarChart = ({ data }: ChartProps) => {
  return (
    <>
      <div>
        <Bar data={data} style={{ cursor: "pointer" }} />
      </div>
    </>
  );
};

export default BarChart;
