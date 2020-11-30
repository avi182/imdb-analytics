import React from "react";
import {
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
} from "recharts";
import { CorrelationScatterChartData } from "../../types";
import style from "./correlation.module.css";

type CorrelationScatterChartProps = {
  data: CorrelationScatterChartData[];
  xAxisLabel: string;
  yAxisLabel: string;
  yAxisUnitString: string;
};

// This component accepts a chart data (array with objects to draw), labels for x & y axis, and yAxis unit string
export function CorrelationScatterChart({
  data,
  xAxisLabel,
  yAxisLabel,
  yAxisUnitString,
}: CorrelationScatterChartProps) {
  function CustomTooltip({ active, payload, label }: TooltipProps) {
    if (active && payload && payload[0].payload.label) {
      const name = payload && payload[0].payload.label;
      const value = payload && payload[0].payload.yAxis;
      return (
        <div className={style.toolTipCorrelation}>
          {name} ({label})
          <br />
          <span style={{ color: "green" }}>
            {Number(value).toFixed(2)}
            {yAxisUnitString}
          </span>
        </div>
      );
    }
    return <></>;
  }

  return (
    <ComposedChart
      width={800}
      height={600}
      data={data}
      margin={{
        top: 20,
        right: 80,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <Tooltip content={<CustomTooltip />} />
      <XAxis
        dataKey="xAxis"
        type="number"
        label={{ value: xAxisLabel, position: "insideBottomRight", offset: 0 }}
      />
      <YAxis
        unit={yAxisUnitString}
        type="number"
        label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
      />
      <Scatter name="yAxis" dataKey="yAxis" fill="#CD5C5C" />
      <Line
        dataKey="correlationLine"
        stroke="#6495ED"
        dot={{ stroke: "#6495ED", strokeWidth: 2 }}
        strokeWidth={"2px"}
        activeDot={false}
        legendType="none"
      />
    </ComposedChart>
  );
}
