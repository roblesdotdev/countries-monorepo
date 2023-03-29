const express = require('express')
const getCountriesRoutes = require('./countries')
const getActivitiesRoutes = require('./activities')

function getApiRoutes() {
  const router = express.Router()

  router.use('/countries', getCountriesRoutes())

  router.use('/activities', getActivitiesRoutes())

  router.use(function (_req, res) {
    res.jsonError('Sorry! Could not found page.', 404)
  })

  return router
}

module.exports = getApiRoutes
