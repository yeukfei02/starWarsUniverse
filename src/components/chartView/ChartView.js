import React from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import _ from 'lodash';

function ChartView(props) {
  console.log("props.chartViewData = ", props.chartViewData);

  const renderChartView = () => {
    let chartView = null;

    if (!_.isEmpty(props.chartViewData)) {
      chartView = (
        <ScatterChart
          width={800}
          height={400}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="height" name="height" unit="" />
          <YAxis type="number" dataKey="mass" name="mass" unit="" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="A school" data={props.chartViewData} fill="#8884d8" />
        </ScatterChart>
      );
    }

    return chartView;
  }

  return (
    <div>
      {renderChartView()}
    </div>
  );
}

export default ChartView;
