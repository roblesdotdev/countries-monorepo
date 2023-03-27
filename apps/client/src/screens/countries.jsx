import Autocomplete from '@/components/autocomplete'
import { FilterIcon, TrashIcon, XMarkIcon } from '@/components/icons'
import { SearchInput } from '@/components/lib'
import Select from '@/components/select'
import { usePagination } from '@/utils/hooks/pagination'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SimplePagination from '@/components/pagination'
import { useCountries, useFetcher } from '@/utils/hooks/state'

export default function CountriesScreen() {
  const navigate = useNavigate()
  const { countries } = useCountries()
  const { isFetching, error } = useFetcher()
  const { currentData, currentPage, numPages, actions } =
    usePagination(countries)

  return (
    <div>
      <DashHeader />
      <div className="p-4">
        {isFetching && !error
          ? 'Loading...'
          : error
          ? JSON.stringify(error, null, 2)
          : null}
        <ul className="cards">
          {currentData().map(country => (
            <li
              key={country.id}
              className="card"
              onClick={() => navigate(`${country.id}`)}
            >
              <img
                src={country.flag_img}
                alt={country.name}
                className="flag-image w-full ratio-video"
              />
              <h1 className="title">{country.name}</h1>
              <div className="details">
                <div>
                  <span>Continent:</span>
                  <span>Africa</span>
                </div>
                <div>
                  <span>Capital:</span>
                  <span>Luanda</span>
                </div>
                <div>
                  <span>Population:</span>
                  <span>13.455</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-4 pb-8">
        <SimplePagination
          currentPage={currentPage}
          numPages={numPages}
          actions={actions}
        />
      </div>
    </div>
  )
}

function DashHeader() {
  const [open, setOpen] = useState(false)
  const [alpha, setAlpha] = useState('')
  const [popu, setPopu] = useState('')
  const [continent, setContinent] = useState('all')
  const [activities, setActivities] = useState([])

  const handleSelectActivity = activity => {
    const found = activities.find(a => a.id === activity.id)
    if (found) return
    setActivities([activity, ...activities])
  }

  return (
    <div className="bg-2st pt-4 pb-4 flex flex-col gap-2 max-w">
      <div className="flex items-center w-full gap-4 pl-4 pr-4">
        <form className="flex-1" onSubmit={e => e.preventDefault()}>
          <SearchInput />
        </form>
        <button
          className="btn btn-link"
          style={{ background: 'rgba(255, 255, 255, 0.04)' }}
          onClick={() => setOpen(!open)}
        >
          {open ? <XMarkIcon /> : <FilterIcon />}
        </button>
      </div>

      <div
        style={{
          height: !open ? '0px' : 'auto',
          opacity: !open ? 0 : 1,
          overflow: !open ? 'hidden' : 'unset',
          transition: 'height 0ms 400ms, opacity 400ms 0',
        }}
      >
        <div className="p-4">
          <div className="pt-4 pb-4">
            <h3 className="text-sm fg-muted mb-4 flex items-center gap-2">
              <span>Sort</span>
              {popu || alpha ? (
                <button
                  className="fg-orange"
                  onClick={() => {
                    setPopu('')
                    setAlpha('')
                  }}
                >
                  <TrashIcon />
                </button>
              ) : null}
            </h3>
            <div className="flex flex-col gap-4">
              <Select
                options={alphaOptions}
                onChange={setAlpha}
                id="sort-alpha"
                label="Alphabetically"
                value={alpha}
              />
              <Select
                options={popuOptions}
                onChange={setPopu}
                id="sort-popu"
                label="Population"
                value={popu}
              />
            </div>
          </div>
          <div className="pt-4 pb-4">
            <h3 className="text-sm fg-muted mb-4 flex items-center gap-2">
              <span>Filters</span>
              {activities.length > 0 ? (
                <button
                  className="color-orange"
                  onClick={() => setActivities([])}
                >
                  <TrashIcon />
                </button>
              ) : null}
            </h3>

            <div className="flex flex-col gap-4">
              <Autocomplete
                placeholder="Activities..."
                suggestions={activityList}
                onSelect={handleSelectActivity}
              />
              {activities.length === 0 ? (
                <p className="fg-muted text-sm">No filtered activities</p>
              ) : (
                <ul className="flex items-center gap-2 white-nowrap flex-wrap">
                  {activities.map(a => (
                    <li
                      onClick={() =>
                        setActivities(activities.filter(ac => ac.id !== a.id))
                      }
                      className="tag"
                      key={a.id}
                    >
                      <span>{a.name}</span>
                      <XMarkIcon />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <ul
          className="pl-4 pr-4 flex gap-4 overflow-y-auto scrollbar-none"
          style={{ zIndex: '-1' }}
        >
          {continentList.map(c => (
            <li
              key={c.value}
              className="white-nowrap"
              onClick={() => setContinent(c.value)}
              style={{
                background:
                  continent === c.value
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                fontSize: '14px',
                padding: '8px 16px',
                cursor: 'pointer',
              }}
            >
              {c.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const alphaOptions = [
  { value: 'asc', label: 'Ascending - [Aa-Zz]' },
  { value: 'desc', label: 'Descending - [Zz-Aa]' },
]
const popuOptions = [
  { value: 'high', label: 'Higher population' },
  { value: 'low', label: 'Lower Population' },
]
const continentList = [
  'All',
  'Africa',
  'Antartica',
  'Asia',
  'Europe',
  'North America',
  'Oceania',
  'South America',
].map(c => ({
  value: c.toLocaleLowerCase().split(' ').join('-'),
  label: c,
}))

const activityList = [
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

export const countryList = Array.from({ length: 9 }, (_, idx) => ({
  id: idx + 1,
  name: `Country ${idx + 1}`,
}))
