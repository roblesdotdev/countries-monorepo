import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

function Autocomplete({
  suggestions = [],
  onSelect,
  isLoading = false,
  placeholder,
}) {
  const [state, setState] = useState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
  })
  const inputRef = useRef(null)

  const handleChange = () => {
    const input = inputRef.current.value.toLowerCase()

    if (suggestions.length === 0) return
    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions
      .filter(({ name }) => name.toLowerCase().startsWith(input.toLowerCase()))
      .slice(0, 10)

    setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
    })
  }

  const onClick = e => {
    setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
    })
    onSelect({ ...e.currentTarget.dataset })
    inputRef.current.value = ''
  }

  const onKeyDown = e => {
    if ([13, 27, 38, 40].includes(e.keyCode)) e.preventDefault()
    const { activeSuggestion, filteredSuggestions } = state

    // User pressed the enter key
    if (e.keyCode === 13) {
      onSelect(filteredSuggestions[activeSuggestion])
      setState({
        activeSuggestion: 0,
        showSuggestions: false,
      })
      inputRef.current.value = ''
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion > 0) {
        setState({ ...state, activeSuggestion: activeSuggestion - 1 })
      }
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions?.length) {
        return
      }
      setState({
        ...state,
        activeSuggestion: Math.min(activeSuggestion + 1, 9),
      })
    }
    // Escape
    else if (e.keyCode === 27) {
      setState({ ...state, showSuggestions: false, activeSuggestion: 0 })
    }
  }

  const { activeSuggestion, filteredSuggestions, showSuggestions } = state

  let suggestionsListComponent

  if (showSuggestions && inputRef.current.value) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions-list">
          {filteredSuggestions.map(({ name, id }, index) => {
            let className

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = 'active'
            }

            return (
              <li
                className={className}
                key={id}
                onClick={onClick}
                data-id={id}
                data-name={name}
              >
                {name}
              </li>
            )
          })}
        </ul>
      )
    } else {
      suggestionsListComponent = (
        <div className="empty">
          {isLoading ? (
            <em>Loading...</em>
          ) : (
            <em>No suggestions, you&apos;re on your own!</em>
          )}
        </div>
      )
    }
  }

  return (
    <div className="suggestions">
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
      />
      <div className="suggestions-container">{suggestionsListComponent}</div>
    </div>
  )
}

Autocomplete.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
    }),
  ).isRequired,
  isLoading: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
}

export default Autocomplete
