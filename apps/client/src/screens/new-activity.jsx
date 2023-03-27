import { InputText } from '@/components/lib'
import Select from '@/components/select'
import Autocomplete from '@/components/autocomplete'
import { useState } from 'react'
import { countryList } from './countries'
import { XMarkIcon } from '@/components/icons'

export default function CreateForm() {
  return (
    <div className="p-4">
      <NewActivityForm />
    </div>
  )
}

function NewActivityForm() {
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [countriesList, setCountriesList] = useState([])
  const [season, setSeason] = useState('')
  const isValidCountriesList = countriesList && countriesList.length
  const isValidSeason = season !== ''

  const addCountryToList = country => {
    const find = countriesList.find(c => country.id === c.id)
    if (!find) setCountriesList([country, ...countriesList])
  }

  const handleRemove = country => {
    setCountriesList(countriesList.filter(c => c.id !== country.id))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setWasSubmitted(true)
    alert('Created')
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
      className="create-form"
    >
      <div className="form-container">
        {Object.keys(textFields).map(key => (
          <InputText
            key={key}
            name={key}
            wasSubmitted={wasSubmitted}
            pattern={textFields[key].pattern}
            errorMessage={textFields[key].errorMessage}
            className="form-field"
          />
        ))}

        <div className="form-field-group">
          <div className="form-field">
            <label>Season</label>
            <Select
              label="Select a season"
              options={listSeasons}
              onChange={val => setSeason(val)}
              name="season"
            />
            {!isValidSeason && wasSubmitted ? (
              <span className="error-message">Please select a season</span>
            ) : null}
          </div>

          <div className="form-field">
            <label>Difficulty</label>
            <div className="radio-group">
              {difficulties.map(dif => (
                <div key={dif.id}>
                  <label className="radio">
                    <input
                      type="radio"
                      name="difficulty"
                      value={dif.id}
                      defaultChecked={dif.checked}
                      id={dif.id}
                    />
                    <span className="radio-label">{dif.id}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="countriesIDs">Countries</label>
          <Autocomplete onSelect={addCountryToList} suggestions={countryList} />
        </div>

        <div className="pb-6">
          {!isValidCountriesList ? (
            wasSubmitted ? (
              <span className="error-message">
                At leas one country is required
              </span>
            ) : null
          ) : (
            countriesList.map(country => (
              <button
                className="btn btn-default flex items-center gap-4"
                style={{
                  fontSize: '12px',
                  borderRadius: '48px',
                  background: 'rgba(255, 255, 255, 0.04)',
                }}
                key={country.id}
                onClick={() => handleRemove(country)}
              >
                <span>{country.name}</span>
                <span>
                  <XMarkIcon />
                </span>
              </button>
            ))
          )}
        </div>

        <button type="submit">Create</button>
      </div>
    </form>
  )
}

export const listSeasons = ['Summer', 'Aurumn', 'Spring', 'Winter'].map(
  val => ({
    value: val.toLocaleLowerCase(),
    label: val,
  }),
)

export const difficulties = ['1', '2', '3', '4', '5'].map((val, i) => ({
  id: val,
  label: `${val} Point${val > 1 ? 's' : ''}`,
  checked: i === 0,
}))

const textFields = {
  name: {
    pattern: '[a-zA-Z ]{4,31}',
    errorMessage: 'The name must be between 4 and 30 characters',
  },
  duration: {
    pattern: '([1-9]|1[0-9]|2[0-4])',
    errorMessage: 'The duration must be between 1 and 24 hours',
  },
}
