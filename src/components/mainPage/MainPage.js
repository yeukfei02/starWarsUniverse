import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';

import ChartView from '../chartView/ChartView';

const ROOT_URL = 'https://swapi.co/api/';

async function getDropdownListItem() {
  const result = await axios.get(`
    ${ROOT_URL}
  `);
  return result;
}

async function getApiByType(type) {
  const result = await axios.get(`${ROOT_URL}${type}/`);
  return result;
}

const selectStyles = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "999"
  })
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    }
  },
}));

function MainPage() {
  const classes = useStyles();

  const [speciesList, setSpeciesList] = useState([]);
  const [species, setSepcies] = useState('');
  const [chartViewData, setChartViewData] = useState(null);

  useEffect(() => {
    const result = getDropdownListItem();
    result
      .then((response) => {
        const keys = Object.keys(response.data);
        if (!_.isEmpty(keys)) {
          const formattedKeysList = keys.map((item, i) => {
            let obj = {};
            obj.value = item;
            obj.label = item.charAt(0).toUpperCase() + item.slice(1);
            return obj;
          });
          setSpeciesList(formattedKeysList);
        }
      })
      .catch((e) => {
        console.log(`error = ${e.message}`);
      });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(species)) {
      if (!_.isEmpty(species.value)) {
        const type = species.value;
        const result = getApiByType(type);
        result
          .then((response) => {
            console.log("results = ", response.data.results);
            setChartViewData(response.data.results);
          })
          .catch((e) => {
            console.log(`error = ${e.message}`);
          })
      }
    }
  }, [species]);

  const handleSpeciesChange = (selectedSpecies) => {
    if (!_.isEmpty(selectedSpecies)) {
      setSepcies(selectedSpecies);
    }
  }

  return (
    <div>
      <div className="mt-5 d-flex justify-content-center">
        <Paper className={`${classes.root} mx-4 w-75 p-3`}>
          <div className="w-100">
            <h3 className="text-center my-3">Star Wars Universe</h3>
            <Select
              styles={selectStyles}
              placeholder={'Pick a species...'}
              value={species}
              onChange={handleSpeciesChange}
              options={speciesList}
              isClearable={true}
            />
          </div>
        </Paper>
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <ChartView chartViewData={chartViewData} />
      </div>
    </div>
  );
}

export default MainPage;
