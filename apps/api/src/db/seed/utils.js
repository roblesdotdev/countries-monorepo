const allActivities = [
  'Visit to museums and historical monuments',
  'City tour',
  'Nature tour',
  'Hiking',
  'Cycling',
  'Surfing',
  'Skiing',
  'Local cuisine',
  'Shopping in tourist areas',
  'Attending tourist events',
  'Wine tasting',
  'Sightseeing tours',
  'Water sports',
  'Theme parks',
  'Zipline adventures',
  'Horseback riding',
  'Hot air balloon rides',
  'Scuba diving',
  'Snorkeling',
  'Whale watching',
].map((t, idx) => ({ id: idx + 1, name: t }))

module.exports = {
  allActivities,
}
