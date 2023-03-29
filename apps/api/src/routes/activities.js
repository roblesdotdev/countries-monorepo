const express = require('express')
const {
  createActivity,
  getAllActivities,
  getActivity,
} = require('../controllers/activities')
const validateForm = require('../middlewares/validation')

function getActivitiesRoutes() {
  const router = express()

  router.route('/').get(getAllActivities).post(validateForm, createActivity)

  router.route('/:id').get(getActivity)

  return router
}

module.exports = getActivitiesRoutes
