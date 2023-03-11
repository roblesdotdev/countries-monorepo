const sequelize = require("sequelize");
const { Activity, Country } = require("../db");

const { DB_DIALECT } = require("../config");

const isPostgres = DB_DIALECT === "postgres";

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

module.exports = {
  getDbCountries,
};
