import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';

import ScatterChartView from '../scatterChartView/ScatterChartView';

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

async function getResponse(url) {
  const result = await axios.get(`${url}`);
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
  const [species, setSpecies] = useState('');
  const [chartViewData, setChartViewData] = useState([]);
  const [loadFinish, setLoadFinish] = useState(false);

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

  const handleSpeciesChange = (selectedSpecies) => {
    if (!_.isEmpty(selectedSpecies)) {
      setSpecies(selectedSpecies);
      if (!_.isEmpty(selectedSpecies.value)) {
        const type = selectedSpecies.value;
        switchSpeciesType(type);
      }
    }
  }

  const switchSpeciesType = async (type) => {
    setLoadFinish(false);

    if (!_.isEmpty(type)) {
      const result = await getApiByType(type);
      if (!_.isEmpty(result)) {
        if (!_.isEmpty(result.data.results)) {
          await setChartViewDataFunc(type, result.data.results);
        }
      }
    }
  }

  const setChartViewDataFunc = async (type, list) => {
    switch (type) {
      case 'people':
        const chartViewData = list.map((item, i) => {
          let obj = {};
          obj.name = item.name ? item.name : '';
          obj.height = item.height ? parseInt(item.height, 10) : 0;
          obj.mass = item.mass ? parseInt(item.mass, 10) : 0;
          return obj;
        });

        if (!_.isEmpty(chartViewData)) {
          setChartViewData(chartViewData);
          setLoadFinish(true);
        }
        break;
      case 'planets':
        const residentsList = list.map((item, i) => {
          return item.residents;
        });
        let formattedResidentsList = [];
        if (!_.isEmpty(residentsList)) {
          residentsList.forEach((item, i) => {
            item.forEach((value, i) => {
              formattedResidentsList.push(value);
            })
          });
        }

        let chartViewData2 = [];
        for (let i = 0; i < formattedResidentsList.length; i++) {
          const item = formattedResidentsList[i];

          let obj = {};

          const response = await getResponse(item);
          obj.name = response.data.name ? response.data.name : '';
          obj.height = response.data.height ? parseInt(response.data.height, 10) : 0;
          obj.mass = response.data.mass && response.data.mass !== 'unknown' ? parseInt(response.data.mass, 10) : 0;

          if (!_.isEmpty(obj))
            chartViewData2.push(obj);
        }

        if (!_.isEmpty(chartViewData2)) {
          setChartViewData(chartViewData2);
          setLoadFinish(true);
        }
        break;
      case 'films':
        const charactersList = list.map((item, i) => {
          return item.characters;
        });
        let formattedCharactersList = [];
        if (!_.isEmpty(charactersList)) {
          charactersList.forEach((item, i) => {
            item.forEach((value, i) => {
              formattedCharactersList.push(value);
            })
          });
        }

        let chartViewData3 = [];
        for (let i = 0; i < formattedCharactersList.length; i++) {
          const item = formattedCharactersList[i];

          let obj = {};

          const response = await getResponse(item);
          obj.name = response.data.name ? response.data.name : '';
          obj.height = response.data.height ? parseInt(response.data.height, 10) : 0;
          obj.mass = response.data.mass && response.data.mass !== 'unknown' ? parseInt(response.data.mass, 10) : 0;

          if (!_.isEmpty(obj))
            chartViewData3.push(obj);
        }

        if (!_.isEmpty(chartViewData3)) {
          setChartViewData(chartViewData3);
          setLoadFinish(true);
        }
        break;
      case 'species':
        const peopleList = list.map((item, i) => {
          return item.people;
        });
        let formattedPeopleList = [];
        if (!_.isEmpty(peopleList)) {
          peopleList.forEach((item, i) => {
            item.forEach((value, i) => {
              formattedPeopleList.push(value);
            })
          });
        }

        let chartViewData4 = [];
        for (let i = 0; i < formattedPeopleList.length; i++) {
          const item = formattedPeopleList[i];

          let obj = {};

          const response = await getResponse(item);
          obj.name = response.data.name ? response.data.name : '';
          obj.height = response.data.height ? parseInt(response.data.height, 10) : 0;
          obj.mass = response.data.mass && response.data.mass !== 'unknown' ? parseInt(response.data.mass, 10) : 0;

          if (!_.isEmpty(obj))
            chartViewData4.push(obj);
        }

        if (!_.isEmpty(chartViewData4)) {
          setChartViewData(chartViewData4);
          setLoadFinish(true);
        }
        break;
      default:

    }
  }

  return (
    <div>
      <div className="mt-5 d-flex justify-content-center">
        <Paper className={`${classes.root} mx-4 w-50 p-3`}>
          <div className="w-100">
            <div className="text-center my-3 h1">Star Wars Universe</div>
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
      <div className="my-4 d-flex justify-content-center">
        <ScatterChartView chartViewData={chartViewData} loadFinish={loadFinish} />
      </div>
    </div>
  );
}

export default MainPage;
