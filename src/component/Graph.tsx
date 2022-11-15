import axios from "axios";
import { useEffect, useState } from "react";
import BarGraph from "./Chart/Bar";
import ErrorBlock from "./ErrorBlock";
import { IGraphData } from "./GraphInterface";
import Loader from "./Loader";

function Graph() {
  const [graphData, setGraphData] = useState<IGraphData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>({
    isLoaded: false,
    graphData: [],
    err: false,
  });
 
  //const urlToFetch = "http://localhost:3000/getgpdata"; //https://my.api.mockaroo.com/graph.json?key=158c1970

  const { REACT_APP_GRAPH_URL } = process.env;

  const [chartLabel] = useState("Novatris Project");

  useEffect(() => {
    if (!isLoaded && REACT_APP_GRAPH_URL)
      axios
        .get(REACT_APP_GRAPH_URL)
        .then((response) => response.data)
        .then((data) => {
          setGraphData(data);
          setIsLoaded(true);
          setApiResponse({ graphData: data, isLoaded: true });
        })
        .catch((err: any) => {
          setApiResponse({ err: err, isLoaded: true });
        });
  }, [isLoaded, REACT_APP_GRAPH_URL]);

  return (
    <>
      {apiResponse.isLoaded ? (
        apiResponse.err ? (
          <ErrorBlock {...apiResponse.err} />
        ) : (
          <BarGraph
            graphData={apiResponse.graphData}
            chartLabel={chartLabel}
          />
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Graph;
