import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useOrder } from '../contexts/OrderContext'
import type { Bottle } from '../types/bottle'
import SuccessModal from '../components/SuccessModal'
import '../styles/pages/Bottle.css'

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
      <div className="error-container">
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
    <div className="bottle-container">
      <button
        type="button"
        onClick={() => navigate('/scan')}
        className="bottle-back-button"
      >
        ← Back to Scan
      </button>

      <div className="bottle-content">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/044/813/102/small/black-wine-bottle-isolated-on-transparent-background-png.png"
          alt={bottle.name}
          className="bottle-image"
        />

        <h2 className="bottle-name">{bottle.name}</h2>
        <p className="bottle-id">{bottle.bottleId}</p>

        <div className="bottle-quantity-controls">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity === 0}
            className="bottle-qty-button"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min={0}
            className="bottle-qty-input"
          />
          <button
            type="button"
            onClick={handleIncrement}
            className="bottle-qty-button"
          >
            +
          </button>
        </div>
      </div>

      <div className="bottle-add-button-container">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={quantity === 0}
          className="bottle-add-button"
        >
          Add to Cart
        </button>
      </div>

      <SuccessModal show={showSuccessModal} title="Added to cart!" />
    </div>
  )
}


