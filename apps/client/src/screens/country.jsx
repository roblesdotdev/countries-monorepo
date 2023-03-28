import { useDetail, useFetcher } from '@/utils/hooks/state'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function CountryScreen() {
  const { id } = useParams()
  const { country: currentCountry } = useDetail(id)
  const { isFetching, error } = useFetcher()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4 pl-4 pr-4 max-w pb-6">
      <div className="flex self-start pt-4">
        <button className="btn btn-default" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      {!isFetching && currentCountry ? (
        <CountryDetail country={currentCountry} />
      ) : isFetching && !error ? (
        'Loading...'
      ) : (
        JSON.stringify(error, null, 2)
      )}
    </div>
  )
}

function CountryDetail({ country }) {
  const hasActivities = country.activities && country.activities.length

  return (
    <div className="">
      <div className="w-full flex flex-col gap-4 detail-card pt-4">
        <img alt={country.name} src={country.flag_img} className="flag-image" />
        <div className="detail-card-list">
          <h1 className="text-xl mb-2">{country.name}</h1>
          <h2 className="text-lg fg-muted">{country.continent}</h2>
          <div className="pt-4 pb-4 flex flex-col gap-4">
            <p>
              Capital: <span>{country.capital}</span>
            </p>
            <p>
              Area: <span>{country.area}</span> km2
            </p>
            <p>
              Poblacion: <span>{country.population}</span> m
            </p>
          </div>
          <div className="pt-4 pb-4">
            {hasActivities ? (
              <>
                <h3 className="fg-muted text-base">Activities</h3>
                <ul className="flex gap-4 items-center pt-4 pb-4">
                  {country.activities.map(a => (
                    <li key={a.id}>
                      <button
                        className="btn btn-default"
                        style={{ fontSize: '12px' }}
                      >
                        {a.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h4 className="fg-muted">
                  No activities were found for {country.name}.
                </h4>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
