import axios from "axios";
import { useEffect, useState } from "react";
import BarGraph from "./Chart/Bar";
import ErrorBlock from "./ErrorBlock";
import { IApiCall, IGraphData } from "./GraphInterface";
import Loader from "./Loader";

function Graph() {
  const [graphData, setGraphData] = useState<IGraphData[]>([]);
  const [apiResponse, setApiResponse] = useState<IApiCall>({
    isLoaded: false,
    err: false,
  });

  //const urlToFetch = "http://localhost:3000/getgpdata"; //https://my.api.mockaroo.com/graph.json?key=158c1970

  const { REACT_APP_GRAPH_URL } = process.env;

  const [chartLabel] = useState("Novatris Project");

  useEffect(() => {
    if (!apiResponse.isLoaded && REACT_APP_GRAPH_URL)
      axios
        .get(REACT_APP_GRAPH_URL)
        .then((response) => response.data)
        .then((data) => {
          setApiResponse({ ...apiResponse, isLoaded: true });
          setGraphData(data);
        })
        .catch((err: any) => {
          setApiResponse({ ...apiResponse, err: err, isLoaded: true });
        });
  }, [apiResponse.isLoaded, REACT_APP_GRAPH_URL]);

  return (
    <>
      {apiResponse.isLoaded ? (
        apiResponse.err ? (
          <ErrorBlock
            {...(typeof apiResponse.err === "object" ? apiResponse.err : {})}
          />
        ) : apiResponse ? (
          <BarGraph graphData={graphData} chartLabel={chartLabel} />
        ) : (
          <ErrorBlock message={"Something went wrong"} />
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Graph;
