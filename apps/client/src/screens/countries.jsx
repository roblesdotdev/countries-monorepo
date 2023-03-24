import { Link } from 'react-router-dom'

export default function CountriesScreen() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-xl">Countries</h1>
      <Link to="BRA">Brasil</Link>
    </div>
  )
}
