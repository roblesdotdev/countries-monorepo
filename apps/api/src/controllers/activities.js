const { Activity, Country } = require("../db");
const { Op } = require("sequelize");

async function createActivity(req, res) {
  const { countries } = req.body;
  const count = await Country.count({
    where: { id: { [Op.in]: countries } },
  });
  if (count !== countries.length) {
    return res.jsonError("Invalid countries IDs provided.", 400);
  }
  const { name, ...formData } = res.form;
  const [activity, created] = await Activity.findOrCreate({
    where: {
      name,
    },
    defaults: {
      ...formData,
    },
  });
  if (!created)
    return res.jsonError(`The activity ${res.form.name} already exists`, 400);
  await activity.setCountries(countries);

  const newActivity = await Activity.findByPk(activity.id, {
    include: {
      model: Country,
      through: { attributes: [] },
    },
  });

  res.jsonSuccess({ activity: newActivity });
}

async function getAllActivities(_req, res) {
  const activities = await Activity.findAll({
    order: [["id", "DESC"]],
  });
  res.jsonSuccess({ activities });
}

async function getActivity(req, res) {
  const { activityID } = req.params;
  const activity = await Activity.findByPk(activityID, {
    include: {
      model: Country,
      through: { attributes: [] },
    },
  });
  if (!activity)
    return res.jsonError(`Couldn't found activity ${activityID}`, 404);

  res.jsonSuccess({ activity });
}

module.exports = {
  createActivity,
  getAllActivities,
  getActivity,
};
