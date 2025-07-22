import clients from '../data/clients'
import ClientCard from '../components/ClientCard'

function HomePage() {
  return (
    <div>
      <h2>Clients</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
