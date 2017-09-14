import { Router } from 'express';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Express Babel' });
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
 routes.get('/data/:year/:term/:courseLevel/:department/:questionCode/:toggleBelowMin/:classSizeMin/:classSizeMax', (req, res) => {
   const data = [
     { Instructor: "Susan Boyle", CourseSection: "APSCI101", QuestionCode: "IUMI06-5", Avg: 3, DispersionIndex: 0.3, ClassSize: 50, Responses: 30, PercentFavourable: 66 },
     { Instructor: "David Festerman", CourseSection: "APSCI101", QuestionCode: "IUMI06-5", Avg: 5, DispersionIndex: 0.8, ClassSize: 100, Responses: 40, PercentFavourable: 72 },
     { Instructor: "Santa Claus", CourseSection: "APSCI101", QuestionCode: "IUMI06-5", Avg: 4, DispersionIndex: 0.10, ClassSize: 400, Responses: 399, PercentFavourable: 99 },
     { Instructor: "Blossom", CourseSection: "APSCI101", QuestionCode: "IUMI06-5", Avg: 5, DispersionIndex: 0.45, ClassSize: 20, Responses: 20, PercentFavourable: 80},
     { Instructor: "", CourseSection: "APSCI101", QuestionCode: "IUMI06-5", Avg: 4, DispersionIndex: 0.5, ClassSize: 70, Responses: 20, PercentFavourable: 46 },
     { Instructor: "Buttercup", CourseSection: "APSCI101", QuestionCode: "IUMI06-5", Avg: 1, DispersionIndex: 0.90, ClassSize: 650, Responses: 500, PercentFavourable: 16 },
    
   ]
   res.send(data)
  })
 routes.get('/dashboard', (req, res) => {
  const data = [
    { dispersion: 0.3, classSize: 50, umi6: 3 },
    { dispersion: 0.7, classSize: 70, umi6: 1 },
    { dispersion: 0.3, classSize: 50, umi6: 4 },
    { dispersion: 0.1, classSize: 50, umi6: 4 },
    { dispersion: 0.35, classSize: 30, umi6: 5 },
    { dispersion: 0.37, classSize: 20, umi6: 4 },
  ]
  res.send(data)
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
