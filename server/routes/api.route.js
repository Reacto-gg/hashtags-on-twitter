const router = require('express').Router();
const Twitter = require('twitter');
require('dotenv').config();


const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET_KEY,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

router.get('/trends', async(req, res, next) => {
    try {
        const id = req.query.woeid;
        const trends = await client.get('trends/place.json', {
            id,
        });
        res.send(trends);
    } catch (error) {
        next(error);
    }
});

router.get('/near_location', async(req, res) => {
    try {
        const { lat, long } = req.query;
        const response = await client.get('trends/closest.json', {
            lat,
            long
        });
        res.send(response);
    } catch (errpr) {
        next(error);
    }
});

module.exports = router;