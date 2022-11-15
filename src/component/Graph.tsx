import axios from "axios";
import React, { useEffect, useState } from "react";
import BarGraph from "./Chart/Bar";
import { IGraphData } from "./GraphInterface";
import Loader from "./Loader";

function Graph() {
  const [graphData, setGraphData] = useState<IGraphData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const urlToFetch = "http://localhost:3000/getgpdata"; //https://my.api.mockaroo.com/graph.json?key=158c1970

  const [chartLabel] = useState("Novatris Project");
  
  useEffect(() => {
    if (!isLoaded)
      axios
        .get(urlToFetch)
        .then((response) => response.data)
        .then((data) => {
          setGraphData(data);
          setIsLoaded(true);
        });
  }, [isLoaded]);

  return (
    <>{isLoaded ? <BarGraph graphData={graphData} chartLabel={chartLabel}   /> : <Loader />}</>
  );
}

export default Graph;
