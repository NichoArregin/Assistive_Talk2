import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AddClientPage from './pages/AddClientPage'
import ClientProfilePage from './pages/ClientProfilePage'
import CalendarPage from './pages/CalendarPage'

function App() {
  return (
    <Router>
      <Header />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-client" element={<AddClientPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/client/:id" element={<ClientProfilePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App