const express = require('express');
const Topic = require('../models/topic');
const router = express.Router();

//CREATE
router.post('/', async (req, res) => {
    const topicPost = new Topic({
        topic: req.body.topic,
        isVerified: false,
    })

    try {
        const topic = await topicPost.save()
        res.status(201).json(topic)
    } catch (err) {
        res.status(401).json({
            message: err
        });
    }
});

// READ
router.get('/', async (req, res) => {
    try {
        const topic = await Topic.find({
            isVerified: true
        })
        if (topic[0].isVerified == true) {
            res.send(topic);
        } else {
            res.send("Not found");
        }
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// READ ALL DATA
router.get('/waiting', async (req, res) => {
    try {
        const topic = await Topic.find({
            isVerified: false
        })
        if (topic[0].isVerified == false) {
            res.send(topic);
        } else {
            res.send("Not found");
        }
    } catch (err) {
        res.send("Data Not found");
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const topicUpdate = await Topic.updateOne({
            _id: req.params.id
        }, {
            isVerified: true
        })
        res.send("isVerified: true");
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const topicDelete = await Topic.deleteOne({
            _id: req.params.id
        })
        res.send("Data has been deleted");
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;