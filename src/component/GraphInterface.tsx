export interface IGraphData {
    date: string;
    units: number;
}

export interface IGraphDataList {
  graphData: IGraphData[];
  chartLabel: string;
 }

 export interface IApiCall{
    error: null|false|true,
    isLoaded: false|true
 }