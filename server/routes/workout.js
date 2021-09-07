const express = require('express');
const router = express.Router();
const repo = require('../database/repository');

router.post('/', function (req, res) {
    /*
        #swagger.tags = ['Workout']
        #swagger.description = "Create a new workout"
        #swagger.parameters['New workout'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/workout" }
        }
    */
    repo.old_saveWorkout(req.body)
        .then((value) =>
            res.status(201)
                .location(value._id)
                .json(value))
        .catch((reason) => res.status(500).json(reason));
});

router.get('/', function (req, res) {
    /*
        #swagger.tags = ['Workout']
        #swagger.description = "Get all workouts"
    */
    repo.old_listWorkouts()
        .then((value) => res.status(200).json(value))
        .catch((reason) => res.status(500).json(reason));
});

router.get('/:id', function (req, res) {
    /*
        #swagger.tags = ['Workout']
        #swagger.description = "Get a workout"
    */
    repo.old_findWorkout(req.params.id)
        .then((value) => res.status(value ? 200 : 404).json(value))
        .catch((reason) => res.status(500).json(reason));
})

router.put('/:id', function (req, res) {
    /*
        #swagger.tags = ['Workout']
        #swagger.description = "Update a workout"
        #swagger.parameters['Updated workout'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/workout" }
        }
    */
    repo.old_updateWorkout(req.params.id, req.body)
        .then((value) => res.status(value.n > 0 ? 204 : 404).json(null))
        .catch((reason) => res.status(500).json(reason));
});

module.exports = router;