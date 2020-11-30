import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { CorrelationScatterChart } from "./charts/correlation-chart/CorrelationScatterChart";
import { formatDataForCorrelationScatterChart as formatDataForChart } from "./charts/util/formatter";
import { Movie } from "./types";

function App() {
  const [isLoading, setLoading] = useState<boolean>(true);

  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    Axios.get("http://localhost:3000/api/movies/all").then(
      ({ data: movies }) => {
        setMovies(movies);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div id="my-class">
          <h3>Correlation between name length and gross profit</h3>
          <CorrelationScatterChart
            data={formatDataForChart(
              movies.map(({ name, cumulativeGross }: Movie) => ({
                name: name.length,
                cumulativeGross: cumulativeGross / 1000000,
                label: name,
              }))
            )}
            yAxisLabel="Profit"
            xAxisLabel="Letters"
            yAxisUnitString="M$"
          />
        </div>
      )}
    </div>
  );
}

export default App;
