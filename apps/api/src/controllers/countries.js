async function getAllCountries(req, res) {
  const { name: q } = req.query;
  if (q) return res.jsonSuccess({ message: `Filtered countries name=${q}` });
  return res.jsonSuccess({ message: "All countries" });
}

async function getCountry(req, res) {
  const { id: countryID } = req.params;
  res.jsonSuccess({ message: `Country detail for ${countryID}` });
}

module.exports = {
  getAllCountries,
  getCountry,
};
