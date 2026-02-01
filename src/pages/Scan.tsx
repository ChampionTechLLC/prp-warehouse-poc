import { useNavigate } from 'react-router-dom'

import { bottles } from '../data/bottles'

export default function Scan() {
  const navigate = useNavigate()

  const handleSimulateScan = () => {
    if (bottles.length === 0) return

    const randomIndex = Math.floor(Math.random() * bottles.length)
    const randomBottle = bottles[randomIndex]

    navigate('/bottle', { state: { bottle: randomBottle } })
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '70%',
          maxWidth: '400px',
          height: '40%',
          border: '2px solid #b84a4a',
          boxSizing: 'border-box',
          backgroundImage:
            'url(https://imgs.search.brave.com/QoDoUb-j_oqpdr_-EdZT1dzrRwBS5YuHGpHN-UKdMtc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9qYW1l/c3RoZXdpbmVndXku/d29yZHByZXNzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/MS8wNC90aGUtZmly/c3QtZXZlci1xci1j/b2RlLW9uLWEtYm90/dGxlLW9mLXdpbmUt/dGhhdC1pLWhhdmUt/c2Vlbi0xLmpwZWc_/dz0zMDAmaD0yMjQ)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div style={{ marginTop: '40px' }}>
        <button
          type="button"
          onClick={handleSimulateScan}
          disabled={bottles.length === 0}
        >
          Simulate Scan
        </button>
      </div>

      <div style={{ marginTop: '12px' }}>
        <button type="button" onClick={() => navigate('/cart')}>
          View Cart
        </button>
      </div>

      <div style={{ marginTop: '12px' }}>
        <button type="button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  )
}


