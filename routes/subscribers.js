const express = require('express');
const router = express.Router();
const Subscribers = require('../models/subscribers');

//Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscribers.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});
//Getting One
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscribers);
});
//Creating One
router.post('/', async (req, res) => {
    const subscribers  = new Subscribers({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });
    try {
        const newSubscriber = await subscribers.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});
//Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null) {
        res.subscribers.name = req.body.name;
    }
    if(req.body.subscribedToChannel != null) {
        res.subscribers.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const updatedSubscriber = await res.subscribers.save();
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});
//Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscribers.remove();
        res.json({message: 'Deleted Subscriber'})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

async function getSubscriber(req, res, next) {
    try {
        subscribers = await Subscribers.findById(req.params.id);
        if(subscribers == null) {
            return res.status(404).json({message: 'Cannot find subscriber'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.subscribers = subscribers;
    next();
}

module.exports = router;