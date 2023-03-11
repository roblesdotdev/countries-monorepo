const express = require("express");
const {
  createActivity,
  getAllActivities,
  getActivity,
} = require("../controllers/activities");

function getActivitiesRoutes() {
  const router = express();

  router.route("/").get(getAllActivities).post(createActivity);

  router.route("/:id").get(getActivity);

  return router;
}

module.exports = getActivitiesRoutes;
