import { Router } from 'express';
import { handleGraphAPI, handleFilterData } from './service/apiService'

require('dotenv').config()

const routes = Router();

/**
 * GET home page
 */
// if (process.env.BUILD === 'PRODUCTION') {
//   res.sendFile(path.join(__dirname, '../public/scripts/bundle.js'))
// }
routes.get('/', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('index', { title: 'Courseval Visualization', append: '/courseval' });
  } else res.render('index', { title: 'Courseval Visualization' });
});

/**
 * GET /list
 *
 * This is a sample route demonstrating
 * a simple approach to error handling and testing
 * the global error handler. You most certainly want to
 * create different/better error handlers depending on
 * your use case.
 */
routes.get('/data/:chartKey/:year/:term/:courseNum/:department/:toggleBelowMin/:questionCode/:classSizeMin/:classSizeMax', (req, res) => {
  handleGraphAPI(req.params.chartKey, req.params).then(x => res.send(x))
})

routes.get('/filterData', (req, res) => {
  handleFilterData().then(x => res.send(x))
})


routes.get('/list', (req, res, next) => {
  const { title } = req.query;

  if (title == null || title === '') {
    // You probably want to set the response HTTP status to 400 Bad Request
    // or 422 Unprocessable Entity instead of the default 500 of
    // the global error handler (e.g check out https://github.com/kbariotis/throw.js).
    // This is just for demo purposes.
    next(new Error('The "title" parameter is required'));
    return;
  }

  res.render('index', { title });
});

export default routes
