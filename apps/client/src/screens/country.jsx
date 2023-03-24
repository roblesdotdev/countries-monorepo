import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function CountryScreen() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>Country detail {id}</h1>
    </div>
  )
}