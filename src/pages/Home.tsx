import { useNavigate } from 'react-router-dom'

import { useOrder } from '../contexts/OrderContext'

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
    <div>
      <div>
        <img src="https://www.prpwine.com/wp-content/uploads/PRPWine_Logo.svg" alt="WineFinder" />
      </div>
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/admin')}
      >
        Warehouse Wine Scanner
      </h3>
      <div>
        <span style={{ marginRight: '8px' }}>Name:</span>
        <input
          type="text"
          value={currentOrder?.name || ''}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <button
          type="button"
          onClick={handleStartScanning}
          disabled={!canStartScanning}
          style={{
            cursor: canStartScanning ? 'pointer' : 'not-allowed',
            opacity: canStartScanning ? 1 : 0.5,
          }}
        >
          Start scanning
        </button>
      </div>
      <div style={{ marginTop: '10px' }}>
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

