const express = require('express');
const util = require('./util')
const repo = require('../database/repository');
const compute = require('../process/compute');
const complete = require('../process/complete');

const init = function (app) {
  // Create routers.
  const programRouter = express.Router();
  const workoutRouter = express.Router({ mergeParams: true });
  const resultRouter = express.Router();
  // Nest workout router.
  programRouter.use('/:programId/workout', workoutRouter);
  // Create program routes.
  programRouter.route('/:programId')
    .get((req, res) => util.GET(repo.findProgram, req.params, res));
  programRouter.route('/')
    .get((req, res) => util.GET_ALL(repo.listPrograms, req.params, res))
    .post((req, res) => util.POST(repo.saveProgram, req.body, res));
  // Create workout routes.
  workoutRouter.route('/')
    .get((req, res) => util.GET_ALL(repo.listWorkouts, req.params, res));
  workoutRouter.route('/:workoutId')
    .get((req, res) => util.GET(repo.findWorkout, req.params, res, compute));
  // Create result router.
  resultRouter.route('/')
    .get((req, res) => util.GET_ALL(repo.listResults, req.params, res))
    .post((req, res) => util.POST(repo.saveResult, req.body, res, complete));
  // Set base route.
  app.use('/api/program', programRouter);
  app.use('/api/result', resultRouter);
}

module.exports = {
  init: init,
}