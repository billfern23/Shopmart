const express = require("express");
const router = express.Router();
const endPointservice = require("../services/endPointservice");

//Any routes that do not exist but are attempted by client, returns proper routes the client could use.
router.use(endPointservice.endpoint);

module.exports = router;
