import { Route, Switch } from "react-router-dom";
import { Movie } from "../../types";
import { CorrelationScatterChartView } from "../correlation-chart-view/CorrelationScatterChartView";
import moment from "moment";

export const ChartRoutes = ({ movies }: { movies: Movie[] }) => {
  return (
    <>
      <Switch>
        <Route path="/name-and-cumulative-gross-profit">
          <CorrelationScatterChartView
            xAxisLabel={"Name length"}
            yAxisLabel={"Cumulative Gross Profit"}
            yAxisUnitString={"M$"}
            chartData={{
              movies,
              formatterCallback: ({ name, cumulativeGross }: Movie) => ({
                a: name.trim().length,
                b: cumulativeGross / 1000000,
                label: name,
              }),
            }}
          />
        </Route>
        <Route path="/rating-and-roi">
          <CorrelationScatterChartView
            xAxisLabel={"Movie rating"}
            yAxisLabel={"ROI"}
            yAxisUnitString={"B$"}
            chartData={{
              movies,
              formatterCallback: ({
                name,
                rating,
                cumulativeGross,
                budget,
              }: Movie) => ({
                a: rating,
                b: ((cumulativeGross / budget) * 100) / 1000,
                label: name,
              }),
            }}
          />
        </Route>
        <Route path="/release-quarter-and-roi">
          <CorrelationScatterChartView
            xAxisLabel={"Release quarter"}
            yAxisLabel={"ROI"}
            yAxisUnitString={"B$"}
            chartData={{
              movies,
              formatterCallback: ({
                name,
                releaseDate,
                cumulativeGross,
                budget,
              }: Movie) => ({
                a: moment(releaseDate).utc().quarter(),
                b: ((cumulativeGross / budget) * 100) / 1000,
                label: name,
              }),
            }}
          />
        </Route>
        <Route path="/runtime-and-roi">
          <CorrelationScatterChartView
            xAxisLabel={"Runtime"}
            yAxisLabel={"ROI"}
            yAxisUnitString={"B$"}
            xAxisUnitString={"min"}
            chartData={{
              movies,
              formatterCallback: ({
                name,
                runtime,
                cumulativeGross,
                budget,
              }: Movie) => ({
                a: runtime,
                b: ((cumulativeGross / budget) * 100) / 1000,
                label: name,
              }),
            }}
          />
        </Route>
        <Route path="/roi-by-genres">
          <CorrelationScatterChartView
            xAxisLabel={"Genre"}
            yAxisLabel={"ROI"}
            yAxisUnitString={"B$"}
            xAxisType="category"
            disableCorrelationLine={true}
            chartData={{
              movies,
              formatterCallback: ({
                name,
                genres,
                cumulativeGross,
                budget,
              }: Movie) => ({
                a: genres.join(","),
                b: ((cumulativeGross / budget) * 100) / 1000,
                label: name,
              }),
            }}
          />
        </Route>
        <Route path="/">
          <p>Welcome to your analytics system!</p>
          <p>Choose a chart from the menu to start...</p>
        </Route>
      </Switch>
    </>
  );
};
