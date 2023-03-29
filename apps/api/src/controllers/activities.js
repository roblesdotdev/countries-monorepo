const {
  countDbCountries,
  findOrCreateDbActivity,
  getDbActivityById,
  getDbActivities,
} = require('../utils/db')

async function createActivity(req, res) {
  const { countries } = req.body
  const count = await countDbCountries(countries)

  if (count !== countries.length) {
    return res.jsonError('Invalid countries IDs provided.', 400)
  }
  const { name, ...formData } = res.form
  const [activity, created] = await findOrCreateDbActivity(name, formData)

  if (!created)
    return res.jsonError(`The activity ${res.form.name} already exists`, 400)
  await activity.setCountries(countries)

  const newActivity = await getDbActivityById(activity.id)

  return res.jsonSuccess({ activity: newActivity })
}

async function getAllActivities(_req, res) {
  const activities = await getDbActivities()
  return res.jsonSuccess({ activities })
}

async function getActivity(req, res) {
  const { id: activityID } = req.params
  const activity = await getDbActivityById(activityID)
  if (!activity)
    return res.jsonError(`Couldn't found activity ${activityID}`, 404)

  return res.jsonSuccess({ activity })
}

module.exports = {
  createActivity,
  getAllActivities,
  getActivity,
}
