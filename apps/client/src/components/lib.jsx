import { Link } from 'react-router-dom'

export function ButtonLink({ to, children }) {
  return (
    <Link className="btn" to={to}>
      {children}
    </Link>
  )
}
