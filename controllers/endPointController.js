const express = require('express')
const router = express.Router()
const endPointservice = require('../services/endPointservice')


router.use(endPointservice.endpoint)

module.exports = router;