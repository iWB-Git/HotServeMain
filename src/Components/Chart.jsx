import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Container } from "@mui/material";
import { height } from "@mui/system";

export default function Chart(props) {
  const chartData = props.charta;

  const data = [
    {
      name: "22:30",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "22:45",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "23:00",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "23:15",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "23:30",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "23:45",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "00:00",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <Container maxWidth={"xl"} sx={{ height: "30em", width: "55em" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}
