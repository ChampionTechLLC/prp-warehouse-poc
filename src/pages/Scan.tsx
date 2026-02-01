import { useNavigate } from 'react-router-dom'

import { bottles } from '../data/bottles'
import '../styles/pages/Scan.css'

export default function Scan() {
  const navigate = useNavigate()

  const handleSimulateScan = () => {
    if (bottles.length === 0) return

    const randomIndex = Math.floor(Math.random() * bottles.length)
    const randomBottle = bottles[randomIndex]

    navigate('/bottle', { state: { bottle: randomBottle } })
  }

  return (
    <div className="scan-container">
      <div className="scan-viewfinder" />

      <div className="scan-button-container">
        <button
          type="button"
          onClick={handleSimulateScan}
          disabled={bottles.length === 0}
        >
          Simulate Scan
        </button>
      </div>

      <div className="scan-button-container-small">
        <button type="button" onClick={() => navigate('/cart')}>
          View Cart
        </button>
      </div>

      <div className="scan-button-container-small">
        <button type="button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  )
}


