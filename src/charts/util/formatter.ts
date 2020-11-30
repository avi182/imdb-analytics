import { correlation } from ".";
import { CorrelationScatterChartData } from "../../types";

export const formatDataForCorrelationScatterChart = (
  arr: any[]
): CorrelationScatterChartData[] => {
  let xPoint: { min?: number; max?: number } = {};
  let yPoint: { min?: number; max?: number } = {};
  const xPoints: number[] = [];
  const yPoints: number[] = [];
  const data: CorrelationScatterChartData[] = arr
    .map((object) => {
      const formattedObject = { xAxis: 0, yAxis: 0, label: object["label"] };
      for (const [, value] of Object.entries(object)) {
        if (!formattedObject.xAxis) {
          // Check max 'x' point
          if (!xPoint.max || Number(value) > xPoint.max) {
            xPoint.max = Number(value);
          }

          // Collect legit 'x' points on chart
          if (Number(value)) {
            xPoints.push(Number(value));
          }

          Object.assign(formattedObject, {
            ...formattedObject,
            xAxis: value,
          });
        } else if (!formattedObject.yAxis) {
          // Check max 'y' point
          if (!yPoint.max || Number(value) > yPoint.max) {
            yPoint.max = Number(value);
          }

          // Collect legit 'y' points on chart
          if (Number(value)) {
            yPoints.push(Number(value));
          } //

          Object.assign(formattedObject, {
            ...formattedObject,
            yAxis: value,
          });
        }
      }
      return formattedObject;
    })
    // Filter out any object that holds a null or zeroed value for the 'y' axis
    .filter((o) => o.yAxis !== 0);

  // Calculating the correlation line data
  const xAndYCorrelation = correlation(xPoints, yPoints);
  const middleYPoint = yPoint && Number(yPoint.max) / 2;
  // Correlation line start on y axis
  const start =
    xAndYCorrelation > 0
      ? middleYPoint - middleYPoint * Math.abs(xAndYCorrelation)
      : middleYPoint + middleYPoint * Math.abs(xAndYCorrelation);
  // Correlation line end on y axis
  const end =
    xAndYCorrelation > 0
      ? middleYPoint + middleYPoint * Math.abs(xAndYCorrelation)
      : middleYPoint - middleYPoint * Math.abs(xAndYCorrelation);
  // Pushing the correlation line into the chart data
  data.push(
    { xAxis: 0, correlationLine: start },
    { xAxis: xPoint.max ? xPoint.max : 0, correlationLine: end }
  );
  return data;
};
