function getFieldError({
  name,
  value,
  pattern = null,
  errorMessage = 'Invalid input',
} = {}) {
  if (!value) return `${name} is required`
  if (!pattern) return null
  const re = new RegExp(`^${pattern}$`)
  if (!re.test(value)) return errorMessage
  return null
}

export { getFieldError }
