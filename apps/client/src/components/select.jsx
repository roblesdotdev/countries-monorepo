import { useState } from 'react'

export default function Select({
  options,
  onChange,
  label,
  value,
  id,
  name,
  ...other
}) {
  const [focused, setFocused] = useState(false)

  const handleOnChange = e => {
    if (onChange && typeof onChange === 'function') {
      onChange(e.target.value)
    }
  }
  return (
    <div className="select">
      <select
        onChange={handleOnChange}
        value={value}
        id={id}
        name={name}
        onBlur={() => setFocused(true)}
        // eslint-disable-next-line react/no-unknown-property
        focused={focused.toString()}
        {...other}
      >
        {label ? (
          <option hidden defaultChecked={true}>
            {label}
          </option>
        ) : null}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="focus"></span>
    </div>
  )
}
