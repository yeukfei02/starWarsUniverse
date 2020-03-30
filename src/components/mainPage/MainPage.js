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
  const [species, setSepcies] = useState('');
  const [chartViewData, setChartViewData] = useState([]);

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
        switchSpeciesType(type);
      }
    }
  }, [species]);

  const switchSpeciesType = async (type) => {
    if (!_.isEmpty(type)) {
      const result = await getApiByType(type);
      if (!_.isEmpty(result)) {
        if (!_.isEmpty(result.data.results)) {
          setChartViewDataFunc(type, result.data.results);
        }
      }
    }
  }

  const setChartViewDataFunc = (type, list) => {
    switch (type) {
      case 'people':
        const chartViewData = list.map((item, i) => {
          let obj = {};
          obj.height = item.height ? parseInt(item.height, 10) : 0;
          obj.mass = item.mass ? parseInt(item.mass, 10) : 0;
          return obj;
        });
        setChartViewData(chartViewData);
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
        const chartViewData2 = formattedResidentsList.map((item, i) => {
          let obj = {};

          const value = getResponse(item);
          value
            .then((response) => {
              obj.height = response.data.height ? parseInt(response.data.height, 10) : 0;
              obj.mass = response.data.mass && response.data.mass !== 'unknown' ? parseInt(response.data.mass, 10) : 0;
            })
            .catch((e) => {
              console.log(`error = ${e.message}`);
            });

          return obj;
        });
        setChartViewData(chartViewData2);
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
        const chartViewData3 = formattedCharactersList.map((item, i) => {
          let obj = {};

          const value = getResponse(item);
          value
            .then((response) => {
              obj.height = response.data.height ? parseInt(response.data.height, 10) : 0;
              obj.mass = response.data.mass && response.data.mass !== 'unknown' ? parseInt(response.data.mass, 10) : 0;
            })
            .catch((e) => {
              console.log(`error = ${e.message}`);
            });

          return obj;
        });
        setChartViewData(chartViewData3);
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
        const chartViewData4 = formattedPeopleList.map((item, i) => {
          let obj = {};

          const value = getResponse(item);
          value
            .then((response) => {
              obj.height = response.data.height ? parseInt(response.data.height, 10) : 0;
              obj.mass = response.data.mass && response.data.mass !== 'unknown' ? parseInt(response.data.mass, 10) : 0;
            })
            .catch((e) => {
              console.log(`error = ${e.message}`);
            });

          return obj;
        });
        setChartViewData(chartViewData4);
        break;
      default:

    }
  }

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
