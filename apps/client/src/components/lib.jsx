import { getFieldError } from '@/utils/validation'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchIcon } from './icons'

export function ButtonLink({ to, children }) {
  return (
    <Link className="btn" to={to}>
      {children}
    </Link>
  )
}

export function Title({ text, size = 'default' }) {
  return (
    <h1
      style={{ '--text': `'${text}'` }}
      className={`title ${size !== 'default' ? `title-${size}` : ''}`}
    >
      <span aria-hidden={true} style={{ '--i': 0 }} />
      <span aria-hidden={true} style={{ '--i': 1 }} />
    </h1>
  )
}

export function Input({ type = 'text', placeholder, ...other }) {
  return (
    <input className="input" type={type} placeholder={placeholder} {...other} />
  )
}

export function SearchInput() {
  return (
    <div className="relative flex items-center">
      <button className="btn btn-link absolute right-0 fg-muted m-auto">
        <SearchIcon />
      </button>
      <Input
        type="search"
        placeholder="Search..."
        style={{ paddingRight: '48px' }}
      />
    </div>
  )
}

export function InputText({
  name,
  wasSubmitted,
  pattern,
  errorMessage,
  ...other
}) {
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)
  const err = getFieldError({ name, value, pattern, errorMessage })
  const displayErrorMessage = (wasSubmitted || touched) && err

  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div key={name} {...other}>
      <label htmlFor={`${name}-input`}>{capitalize(name)}</label>{' '}
      <Input
        id={`${name}-input`}
        name={name}
        type="text"
        onChange={event => setValue(event.currentTarget.value)}
        onBlur={() => setTouched(true)}
        pattern={pattern}
        required
        aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
      />
      {displayErrorMessage ? (
        <span role="alert" id={`${name}-error`} className="error-message">
          {err}
        </span>
      ) : null}
    </div>
  )
}
