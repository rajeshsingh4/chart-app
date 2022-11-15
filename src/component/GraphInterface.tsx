export interface IGraphData {
    date: string;
    units: number;
}

export interface IGraphDataList {
  graphData: IGraphData[];
  chartLabel: string;
 }

 export interface IApiCall{
    err: false|true,
    isLoaded: false|true
 }

