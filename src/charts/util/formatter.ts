import { correlation } from ".";
import { CorrelationScatterChartData } from "../../types";

export const formatDataForCorrelationScatterChart = (
  arr: { name: number; cumulativeGross: number; label: string }[]
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
          // Check x parameters
          if (!xPoint.min || Number(value) < xPoint.min) {
            xPoint.min = Number(value);
          }
          if (!xPoint.max || Number(value) > xPoint.max) {
            xPoint.max = Number(value);
          }

          //
          if (Number(value)) {
            xPoints.push(Number(value));
          }
          //

          Object.assign(formattedObject, {
            ...formattedObject,
            xAxis: value,
          });
        } else if (!formattedObject.yAxis) {
          // Check y parameters
          if (!yPoint.min || Number(value) < yPoint.min) {
            yPoint.min = Number(value);
          }
          if (!yPoint.max || Number(value) > yPoint.max) {
            yPoint.max = Number(value);
          }

          //
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
    .filter((o) => o.yAxis !== 0);
  // Calculating & pushing the correlation line data
  const xAndYCorrelation = correlation(xPoints, yPoints);
  const middleYPoint = yPoint && Number(yPoint.max) / 2;
  const start =
    xAndYCorrelation > 0
      ? middleYPoint - middleYPoint * Math.abs(xAndYCorrelation)
      : middleYPoint + middleYPoint * Math.abs(xAndYCorrelation);
  const end =
    xAndYCorrelation > 0
      ? middleYPoint + middleYPoint * Math.abs(xAndYCorrelation)
      : middleYPoint - middleYPoint * Math.abs(xAndYCorrelation);
  data.push(
    { xAxis: 0, correlationLine: start },
    { xAxis: xPoint.max ? xPoint.max : 0, correlationLine: end }
  );
  return data;
};
