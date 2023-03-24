import { Link } from 'react-router-dom'

export function ButtonLink({ to, children }) {
  return (
    <Link className="btn" to={to}>
      {children}
    </Link>
  )
}

export function Title({ text }) {
  return (
    <h1 style={{ '--text': `'${text}'` }} className="title">
      <span aria-hidden={true} style={{ '--i': 0 }} />
      <span aria-hidden={true} style={{ '--i': 1 }} />
    </h1>
  )
}
