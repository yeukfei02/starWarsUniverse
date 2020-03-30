import React, { useState } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import _ from 'lodash';

const ROOT_URL = 'https://swapi.co/api/';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

async function getNodeResponseByName(name) {
  const result = await axios.get(
    `${ROOT_URL}people/`,
    {
      params: {
        search: name
      }
    }
  );
  return result;
}

function ScatterChartView(props) {
  const classes = useStyles();
  const [gender, setGender] = useState('');

  const renderChartView = () => {
    let chartView = (
      <Alert severity="warning">No data</Alert>
    );

    if (!_.isEmpty(props.chartViewData) && props.loadFinish === true) {
      chartView = (
        <ScatterChart
          width={600}
          height={400}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <XAxis type="number" dataKey="height" name="height" unit="" />
          <YAxis type="number" dataKey="mass" name="mass" unit="" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} separator="" formatter={formatTooltip} />
          <Scatter
            name="height and mass relationship"
            data={props.chartViewData}
            fill="red"
            onMouseOver={(e) => handleScatterMouseOver(e)}
          />
          <Legend />
        </ScatterChart>
      );
    }

    return chartView;
  }

  const handleScatterMouseOver = async (e) => {
    const name = e.name;
    const result = await getNodeResponseByName(name);
    if (!_.isEmpty(result)) {
      if (!_.isEmpty(result.data.results) && result.data.results.length === 1) {
        const gender = result.data.results[0].gender;
        setGender(gender);
      }
    }
  }

  const formatTooltip = (value, name, props) => {
    return `Name: ${props.payload.name} Gender: ${gender}`;
  }

  return (
    <div className={`${classes.root} d-flex justify-content-center`}>
      {renderChartView()}
    </div>
  );
}

export default ScatterChartView;
