const logger = require('loglevel')
const { Country, Activity } = require('../')
const { findOrCreateDbActivity } = require('../../utils/db')
const { fetchData, getAllActivities } = require('./utils')

async function seedCountries() {
  const count = await Country.count()
  if (count === 0) {
    logger.info('🌎 Seeding Countries...')
    try {
      const countries = await fetchData()
      await Country.bulkCreate(countries)
      logger.info('✅ Countries are in db!')
    } catch (e) {
      logger.info(`❌ ${e.message}`)
    }
  }
}

async function seedActivities() {
  const count = await Activity.count()
  if (count === 0) {
    try {
      logger.info('🏔️  Seeding Activities...')
      const countries = await Country.findAll({
        where: {
          continent: 'South America',
        },
        raw: true,
        attributes: ['id'],
      })
      const ids = countries.map(c => c.id)
      const activities = getAllActivities(ids)
      Promise.all(
        activities.map(async act => {
          const { countries, ...data } = act
          const created = await Activity.create(data)
          await created.setCountries(countries)
        }),
      )
      logger.info('✅ Activities are in db!')
    } catch (e) {
      console.log(e)
      logger.info(`❌ ${e.message}`)
    }
  }
}

async function seed() {
  logger.info('⏳ Populating database...')
  await seedCountries()
  await seedActivities()
  logger.info('✅ Database is populated!')
}

module.exports = seed
