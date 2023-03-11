const { getDbCountries } = require("../utils/db");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

async function getAllCountries(req, res) {
  const { name: query } = req.query;
  const result = await getDbCountries(query);

  if (query && !result.rows.length)
    return res.jsonError(`Country '${query}' couldn't found.`, 404);

  if (!result.rows.length)
    return res.jsonError(
      "We couldn't find the page you were looking for.",
      404
    );
  res.jsonSuccess({
    totalItems: result.count,
    countries: result.rows,
    query: query ?? null,
  });
}

async function getCountry(req, res) {
  const { id: countryID } = req.params;
  const country = await Country.findByPk(countryID, {
    include: {
      model: Activity,
      through: { attributes: [] },
    },
  });
  if (!country) {
    return res.jsonError(`Country with id ${countryID} couldn't found`, 404);
  }
  res.jsonSuccess({ country });
}

module.exports = {
  getAllCountries,
  getCountry,
};
