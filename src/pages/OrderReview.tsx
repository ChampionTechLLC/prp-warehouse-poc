import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import type { Order } from '../types/order'
import { bottles } from '../data/bottles'
import CartLineItem from '../components/CartLineItem'
import { useOrder } from '../contexts/OrderContext'
import '../styles/common.css'
import '../styles/pages/OrderReview.css'

type OrderLocationState = {
  order?: Order
}

export default function OrderReview() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as OrderLocationState | null
  const order = state?.order
  const { updateQty } = useOrder()

  const { totalPrice, totalBottles } = useMemo(() => {
    if (!order) return { totalPrice: 0, totalBottles: 0 }

    const price = order.lineItems.reduce((sum, lineItem) => {
      const bottle = bottles.find((b) => b.bottleId === lineItem.bottleId)
      return sum + (bottle ? bottle.price * lineItem.qty : 0)
    }, 0)

    const bottleCount = order.lineItems.reduce(
      (sum, lineItem) => sum + lineItem.qty,
      0,
    )

    return { totalPrice: price, totalBottles: bottleCount }
  }, [order])

  if (!order) {
    return (
      <div className="error-container">
        <p>No order data found.</p>
        <button type="button" onClick={() => navigate('/admin')}>
          Back to Admin
        </button>
      </div>
    )
  }

  const isCompleted = order.status === 'completed'

  return (
    <div className="page-container">
      <button
        type="button"
        onClick={() => navigate('/admin')}
        className="back-button"
      >
        ← Back
      </button>

      <h2 className="order-review-title">Order</h2>

      <div className="info-card">
        <div className="info-card-content">
          <div>
            <span className="info-label">Customer:</span>
            <span className="info-value">{order.name || 'Unnamed Order'}</span>
          </div>
          <div>
            <span className="info-label">Order ID:</span>
            <span className="info-value">{order.orderId}</span>
          </div>
          <div>
            <span className="info-label">Status:</span>
            <span
              className={`info-value status-text ${isCompleted ? 'status-completed' : 'status-in-progress'}`}
            >
              {order.status}
            </span>
          </div>
          <div>
            <span className="info-label">Total Bottles:</span>
            <span className="info-value">{totalBottles}</span>
          </div>
          <div>
            <span className="info-label">Total Price:</span>
            <span className="info-value">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {order.lineItems.length === 0 ? (
        <div className="empty-state-large">
          <p>No items in this order.</p>
        </div>
      ) : (
        <div className="card-container">
          {order.lineItems.map((lineItem) => (
            <div key={lineItem.lineItemId}>
              {isCompleted ? (
                <CartLineItem lineItem={lineItem} />
              ) : (
                <CartLineItem
                  lineItem={lineItem}
                  onUpdateQty={(lineItemId, qty) => updateQty(lineItemId, qty)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
