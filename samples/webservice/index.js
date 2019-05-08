const app = require('express')();
const axios = require('axios');
const _ = require('lodash/fp');
const Im = require('seamless-immutable');

const debug = (id, f, options = {}) => {
  const output = options.output || console.log;
  const processResult = options.processResult || (result => result);
  const processArgs = options.processArgs || (args => args);
  return (...args) => {
    output(`DEBUG(${id}): `, processArgs(args));
    const result = f(...args);
    output(`DEBUG(${id}/result): `, processResult(result));
    return result;
  };
};

const fetchData = () =>
  axios
    .get('https://outlier.oliversturm.com:8081/countries')
    .then(result => result.data.data)
    .catch(err => console.error('Error during data fetching: ', err));

// field -> [list] -> ['field' values from list]
const extractField = field => _.map(v => v[field]);

// [list] -> average of values in list
const average = _.compose([
  ci => ci.total / ci.count,
  _.reduce((r, v) => ({ total: r.total + v, count: r.count + 1 }))({
    total: 0,
    count: 0
  })
]);

// field -> [list] -> average of value 'field' in list
const fieldAverage = field => _.compose([average, extractField(field)]);

// [fields] -> [list] -> { averages of 'fields' in list }
const averages = fields => data =>
  _.reduce((r, v) => r.set(`average-${v}`, fieldAverage(v)(data)))(Im({}))(
    fields
  );

const getAverageNames = qp => {
  const keys = Object.keys(qp);
  return keys.length > 0 ? keys : ['population', 'areaKM2'];
};

const getResults = queryParams =>
  fetchData()
    .then(averages(getAverageNames(queryParams)))
    .then(JSON.stringify);

// Supported URLs:
// http://localhost:3000/averages
// http://localhost:3000/averages?population&areaKM2
// http://localhost:3000/averages?population
// http://localhost:3000/averages?areaKM2

app.use(require('morgan')('dev'));
app.get('/averages', (req, res) =>
  getResults(req.query).then(v => {
    res.set('Content-Type', 'application/json');
    res.send(v);
  })
);
app.listen(3000, () => console.log('Server running'));
