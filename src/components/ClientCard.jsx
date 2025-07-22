import { Link } from 'react-router-dom'
import '../styles/ClientCard.css'

function ClientCard({ client }) {
  return (
    <Link to={`/client/${client.id}`} className="client-card">
      <img src={client.image} alt={client.name} />
      <h3>{client.name}</h3>
    </Link>
  )
}

export default ClientCard
