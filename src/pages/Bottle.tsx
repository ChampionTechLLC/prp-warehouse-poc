import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useOrder } from '../contexts/OrderContext'
import type { Bottle } from '../types/bottle'
import SuccessModal from '../components/SuccessModal'

type BottleLocationState = {
  bottle?: Bottle
}

export default function Bottle() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as BottleLocationState | null
  const bottle = state?.bottle
  const { addBottle } = useOrder()
  const [quantity, setQuantity] = useState(1)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  if (!bottle) {
    return (
      <div>
        <p>No bottle data found.</p>
        <button type="button" onClick={() => navigate('/scan')}>
          Back to Scan
        </button>
      </div>
    )
  }

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(0, prev - 1))
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (!Number.isNaN(value) && value >= 0) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      addBottle(bottle.bottleId, quantity)
      setShowSuccessModal(true)

      setTimeout(() => {
        setShowSuccessModal(false)
        navigate('/scan')
      }, 2000)
    }
  }

  return (
    <div style={{ position: 'relative', paddingBottom: '80px' }}>
      <button
        type="button"
        onClick={() => navigate('/scan')}
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
        }}
      >
        ← Back to Scan
      </button>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '60px',
        }}
      >
        <img
          src="https://imgs.search.brave.com/8KdyVArV4VU2lvlc6PBKXEqkbkVs0JxHgxgFaDCc8cM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcG5zcG9vbi5j/b20vbWVkaWEvY2F0/YWxvZy9wcm9kdWN0/L2NhY2hlLzEvdGh1/bWJuYWlsLzlkZjc4/ZWFiMzM1MjVkMDhk/NmU1ZmI4ZDI3MTM2/ZTk1LzcvOC83ODI1/Ni5qcGc"
          alt={bottle.name}
          style={{
            width: '200px',
            height: '300px',
            borderRadius: '8px',
            marginBottom: '20px',
            objectFit: 'cover',
          }}
        />

        <h2>{bottle.name}</h2>
        <p style={{ color: '#666' }}>{bottle.bottleId}</p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '30px',
          }}
        >
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity === 0}
            style={{
              width: '40px',
              height: '40px',
              fontSize: '20px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: quantity === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min={0}
            style={{
              width: '60px',
              height: '40px',
              textAlign: 'center',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button
            type="button"
            onClick={handleIncrement}
            style={{
              width: '40px',
              height: '40px',
              fontSize: '20px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            +
          </button>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={quantity === 0}
          style={{
            padding: '12px 40px',
            fontSize: '16px',
            backgroundColor: quantity === 0 ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: quantity === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Add to Cart
        </button>
      </div>

      <SuccessModal show={showSuccessModal} title="Added to cart!" />
    </div>
  )
}


