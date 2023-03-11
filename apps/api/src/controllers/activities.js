async function createActivity(req, res) {
  res.jsonSuccess({ message: "Post activity" });
}

async function getAllActivities(_req, res) {
  res.jsonSuccess({ message: "All activities" });
}

async function getActivity(req, res) {
  const { id: activityID } = req.params;
  res.jsonSuccess({ message: `Activity with id ${activityID}` });
}

module.exports = {
  createActivity,
  getAllActivities,
  getActivity,
};
