export type Movie = {
  name: string;
  year: string;
  rating: number;
  runtime: number;
  genres: string[];
  releaseDate: number;
  budget: number;
  cumulativeGross: number;
};

export type CorrelationScatterChartData = {
  xAxis?: number;
  yAxis?: number;
  correlationLine?: number;
};
