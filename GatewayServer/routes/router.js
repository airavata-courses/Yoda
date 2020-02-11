const express = require("express");
const routers = express.Router();
const {
  dataRetrieve,
  realtime,
  activityHelper,
  activityRetrieve,
  getActivity
} = require("../Controllers/controller");

routers.post("/retrievedata", dataRetrieve);
routers.post("/realtime", realtime);
routers.get("/activity", activityHelper);

// TO get the list of activities of that user.
routers.post("/retrieveactivities", activityRetrieve);
routers.post("/getactivity", getActivity);

module.exports = routers;
