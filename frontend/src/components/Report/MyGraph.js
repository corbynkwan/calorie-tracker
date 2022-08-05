import React from "react";
import useStyles from "./style";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  Label,
} from "recharts";

/**
 * Define all colors for linear gradient with an id
 */
const GradientColors = () => {
  return (
    <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
      <stop offset="30%" stopColor="#8884d8" stopOpacity={0.4} />
      <stop offset="75%" stopColor="#ff9bff81" stopOpacity={0.3} />
      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2} />
    </linearGradient>
  );
};
const targets= {
   "calories": 1500,
   "carbs":180,
   "fat":50,
   "protein":75
}

const yAxisMax = (data,selectedNutrient) => {
  if (data !== undefined) {
    const datMax = Math.max(...data.map((o) => o[{selectedNutrient}]));
    return datMax > targets[selectedNutrient] ? datMax + 100 : targets[selectedNutrient]  + 100;
  } else {
    return targets[selectedNutrient] + 100;
  }
};

const MyGraph = ({ data, selectedNutrient }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.graphContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <GradientColors />
            </defs>
            <Tooltip
              itemStyle={{ color: "#fff", backgroundColor: "#0A1322" }}
              contentStyle={{ backgroundColor: "#0A1322" }}
            />
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#8884d8"
              opacity={0.4}
            />
            <XAxis
              dataKey="date"
              domain={["auto", "auto"]}
              tick={{ fill: "black" }}
              tickFormatter={(date) => date}
              stroke="#EEEEEE"
            />
            <YAxis
              dataKey= {selectedNutrient}
              domain={[0, yAxisMax(data, selectedNutrient)]}
              tick={{ fill: "#B6BAC3" }}
              stroke="#EEEEEE"
              type="number"
            />
            <ReferenceLine y={targets[selectedNutrient]} stroke="black" strokeWidth={2}>
              <Label value={targets[selectedNutrient]} position="top" />
            </ReferenceLine>
            <Area
              dataKey={selectedNutrient}
              type="monotone"
              stroke="#8884d8"
              strokeWidth={3}
              strokeOpacity={1}
              fill="url(#colorView)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MyGraph;
