import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  title: {
    text: "My chart",
  },
  series: [
    {
      data: [1, 2, 3],
    },
  ],
  credits: {
    enabled: false,
  },
};

export const Charts = () => {
  return (
    <div>
      <h1>Charts</h1>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
