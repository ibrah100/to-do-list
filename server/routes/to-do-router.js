const { Router } = require('express');
const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');

// GET
todoRouter.get('/', (req, res) => {
    let sqlQuery = `
    SELECT * FROM "tasks"
    ORDER BY "id" ASC
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
todoRouter.put('/:id', (req,res) => {
    console.log('req.params: ', req.params);
    console.log('req.body: ', req.body);
  
    let idToUpdate = req.params.id;
    let newComplete = req.body.complete;

    let sqlQuery = `
        UPDATE "tasks"
            SET "complete"=$1
            WHERE "id"=$2
    `
    let sqlValues = [newComplete, idToUpdate];
    pool.query(sqlQuery, sqlValues)
        .then( (dbRes) => {
            res.sendStatus(200);
        })
        .catch( (dbErr) => {
            console.log('Error in PUT /:id')
            res.sendStatus(500);
        })
})



//DELETE
todoRouter.delete('/:id', (req, res) => {
    console.log(req.params);
    let idToDelete = req.params.id;

    let sqlQuery = `
        DELETE FROM "tasks"
            WHERE "id"=$1;
    `
    let sqlValues = [idToDelete];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(200);
    })
    .catch((dbErr) => {
        console.log('error in DELETE /:id', dbErr);
        res.sendStatus(500);
    })
})



module.exports = todoRouter;