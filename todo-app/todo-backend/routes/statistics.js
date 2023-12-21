const express = require('express');
const redis = require('../redis')
const router = express.Router();

router.get('/', async (_, res) => {
  const stat = await redis.getAsync('added_todos')
  const statVal = stat ? stat : 'Not exist'
  res.send(statVal);
});

module.exports = router;