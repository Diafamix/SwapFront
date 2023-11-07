import styled from "styled-components";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

var first = true;

const MiniChart = ({ history }) => {
  if (history == undefined || history.data == undefined) return;

  //console.log(history.data.map(entry => entry.time))

  const data = {
    labels: history.data.map((entry) => new Date(entry.time)),
    datasets: [
      {
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#3773f5",
        borderColor: "#3773f5",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#3773f5",
        pointBackgroundColor: "#3773f5",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#3773f5",
        pointHoverBorderColor: "#3773f5",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: history.data.map((entry) => entry.priceUsd),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      // to remove the labels
      x: {
        ticks: {
          display: false,
        },

        // to remove the x-axis grid
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      // to remove the y-axis labels
      y: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        // to remove the y-axis grid
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
  };

  return (
    <Wrapper>
      <Line data={data} options={options} width={150} height={50} />
    </Wrapper>
  );
};

export default MiniChart;

const Wrapper = styled.div``;
