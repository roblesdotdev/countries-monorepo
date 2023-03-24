import { Link } from 'react-router-dom'

export default function WelcomeScreen() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="dash">Explore</Link>
    </div>
  )
}
