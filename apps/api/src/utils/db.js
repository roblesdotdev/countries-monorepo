const sequelize = require("sequelize");
const { Activity, Country } = require("../db");

const { DB_DIALECT } = require("../config");

const isPostgres = DB_DIALECT === "postgres";

/**
 * @param query string
 */
async function getDbCountries(query) {
  const queryConfig = {
    attributes: ["id", "name", "flag_img", "continent", "population"],
    order: [["name", "ASC"]],
    include: {
      model: Activity,
      attributes: ["id"],
      through: { attributes: [] },
    },
  };
  if (query)
    queryConfig.where = isPostgres
      ? { name: { [sequelize.Op.iLike]: `%${query}%` } }
      : sequelize.where(sequelize.fn("lower", sequelize.col("Country.name")), {
          [sequelize.Op.like]: `%${query}%`,
        });
  return Country.findAndCountAll(queryConfig);
}

/**
 * @param countries List of countries ids
 */
async function countDbCountries(countries) {
  return Country.count({
    where: { id: { [sequelize.Op.in]: countries } },
  });
}

/**
 * @param name activity name
 * @param formData { name, difficulty, duration, seasson }
 */
async function findOrCreateDbActivity(name, formData) {
  return Activity.findOrCreate({
    where: {
      name,
    },
    defaults: {
      ...formData,
    },
  });
}

async function getDbActivityById(id) {
  return Activity.findByPk(id, {
    include: {
      model: Country,
      through: { attributes: [] },
    },
  });
}

async function getDbActivities() {
  return Activity.findAll({
    order: [["id", "DESC"]],
  });
}

async function getDbCountryById(countryId) {
  return Country.findByPk(countryId, {
    include: {
      model: Activity,
      through: { attributes: [] },
    },
  });
}

module.exports = {
  getDbCountries,
  getDbCountryById,
  countDbCountries,
  findOrCreateDbActivity,
  getDbActivityById,
  getDbActivities,
};
