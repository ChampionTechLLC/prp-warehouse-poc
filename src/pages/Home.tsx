import { useNavigate } from 'react-router-dom'

import { useOrder } from '../contexts/OrderContext'
import '../styles/pages/Home.css'

export default function Home() {
  const navigate = useNavigate()
  const { currentOrder, setName } = useOrder()
  const nameLength = (currentOrder?.name || '').trim().length
  const canStartScanning = nameLength >= 3

  const handleStartScanning = () => {
    if (canStartScanning) {
      navigate('/scan')
    }
  }

  return (
    <div className="home-container">
      <div className="home-logo">
        <img src="https://www.prpwine.com/wp-content/uploads/PRPWine_Logo.svg" alt="WineFinder" />
      </div>
      <h3 className="home-title" onClick={() => navigate('/admin')}>
        Warehouse Wine Scanner
      </h3>
      <div className="home-name-input-container">
        <label htmlFor="name-input" className="home-name-label">
          Name:
        </label>
        <input
          id="name-input"
          type="text"
          value={currentOrder?.name || ''}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="home-name-input-field"
        />
      </div>
      <div className="home-button-container">
        <button
          type="button"
          onClick={handleStartScanning}
          disabled={!canStartScanning}
          className="home-button"
        >
          Start scanning
        </button>
      </div>
      <div className="home-button-container-small">
        <button
          type="button"
          onClick={() => navigate('/cart')}
        >
          View Cart
        </button>
      </div>
    </div>
  )
}

