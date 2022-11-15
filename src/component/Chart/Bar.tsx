import  { useEffect, useState } from 'react';
import {  IGraphDataList } from '../GraphInterface';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Loader from '../Loader';
import './Chart.css'
Chart.register(CategoryScale);

function BarGraph(graphDataObj : IGraphDataList) {  
    const {graphData,chartLabel} = {...graphDataObj };
    const [graphDataToDisplay,setGraphDataToDisplay]=useState<any>(null);
 
    useEffect(() => {
        setGraphDataToDisplay( {
            labels: graphData.map(graphData => graphData.date),
            datasets: [
              {
                label: chartLabel,
                data: graphData.map(grphObj => grphObj.units),
              },
            ],
          });
    },[graphDataToDisplay])
   

  return (
    <div className="graphBox">
        { graphDataToDisplay ? <Bar data={graphDataToDisplay} />: <Loader/> }  
    </div>
  );
}


export default BarGraph;
