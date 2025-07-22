import { Link } from 'react-router-dom'

function Header() {
  return (
    <header style={{ padding: '10px', background: '#222', color: 'white' }}>
      <h1>Assistive Talk</h1>
      <nav style={{ marginTop: '10px' }}>
        <Link to="/" style={{ marginRight: '15px', color: 'lightblue' }}>Home</Link>
        <Link to="/add-client" style={{ marginRight: '15px', color: 'lightblue' }}>Add Client</Link>
        <Link to="/calendar" style={{ marginRight: '15px', color: 'lightblue' }}>Calendar</Link>
      </nav>
    </header>
  )
}

export default Header