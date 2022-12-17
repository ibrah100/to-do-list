const { Router } = require('express');
const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');

// GET
todoRouter.get('/', (req, res) => {
    let sqlQuery = `
    SELECT * FROM "tasks"
    `;
    pool.query(sqlQuery)
    .then((dbRes) => {
        //send back the array of tasks
        res.send(dbRes.rows);
    }).catch ((dbErr) => {
        console.log('something broke in /weekend-to-do-app GET');
        res.sendStatus(500);
    })
})

// POST
todoRouter.post('/', (req, res) => {
    let newTask = req.body;
    console.log('adding a task', newTask);

    let sqlQuery = `
    INSERT INTO "tasks" ("task", "complete")
        VALUES ($1, $2);
    `
    let sqlValues = [newTask.task, newTask.complete];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(200);
    })
    .catch((dbErr) => {
        console.log('error adding a new task', dbErr);
        res.sendStatus(500);
    })
})

// PUT
todoRouter.put('/:id', (req,res) => {})



//DELETE
todoRouter.delete('/:id', (req, res) => {})



module.exports = todoRouter;