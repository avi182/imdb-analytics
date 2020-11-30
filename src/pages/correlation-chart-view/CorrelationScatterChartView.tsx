import { CorrelationScatterChart } from "../../charts/correlation-chart/CorrelationScatterChart";
import { getChartData } from "../../charts/util/formatter";
import { Movie } from "../../types";

export const CorrelationScatterChartView = ({
  chartData,
  yAxisLabel,
  xAxisLabel,
  yAxisUnitString,
  xAxisUnitString,
  xAxisType,
  disableCorrelationLine = false,
}: {
  chartData: { movies: Movie[]; formatterCallback: ({ a, b }: any) => {} };
  yAxisLabel: string;
  xAxisLabel: string;
  yAxisUnitString: string;
  xAxisUnitString?: string;
  xAxisType?: "number" | "category";
  disableCorrelationLine?: boolean;
}) => {
  const { movies, formatterCallback } = chartData;
  return (
    <div>
      <CorrelationScatterChart
        chartData={getChartData(
          movies,
          formatterCallback,
          disableCorrelationLine
        )}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
        yAxisUnitString={yAxisUnitString}
        xAxisUnitString={xAxisUnitString}
        xAxisType={xAxisType}
        disableCorrelationLine={disableCorrelationLine}
      />
    </div>
  );
};
