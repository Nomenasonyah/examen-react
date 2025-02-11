// import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { dataset } from "./Graph2";
import "./Graph2.scss"
export default function GridDemo() {
  return (
    <LineChart
      dataset={dataset}
      xAxis={[{ dataKey: "x" }]}
      series={[{ dataKey: "y" }]}
       width={300}
      // height={300}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
