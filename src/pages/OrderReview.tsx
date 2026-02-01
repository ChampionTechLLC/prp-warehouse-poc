import { useLocation, useNavigate } from 'react-router-dom'

import type { Order } from '../types/order'
import CartLineItem from '../components/CartLineItem'
import { useOrder } from '../contexts/OrderContext'

type OrderLocationState = {
  order?: Order
}

export default function OrderReview() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as OrderLocationState | null
  const order = state?.order
  const { updateQty } = useOrder()

  if (!order) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <p>No order data found.</p>
        <button type="button" onClick={() => navigate('/admin')}>
          Back to Admin
        </button>
      </div>
    )
  }

  const isCompleted = order.status === 'completed'

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
        paddingTop: '60px',
      }}
    >
      <button
        type="button"
        onClick={() => navigate('/admin')}
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: '1px solid transparent',
          backgroundColor: '#1a1a1a',
          color: 'rgba(255, 255, 255, 0.87)',
          cursor: 'pointer',
          fontSize: '1em',
          fontFamily: 'inherit',
          fontWeight: 500,
          transition: 'border-color 0.25s, background-color 0.25s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#646cff'
          e.currentTarget.style.backgroundColor = '#2a2a2a'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'transparent'
          e.currentTarget.style.backgroundColor = '#1a1a1a'
        }}
      >
        ← Back
      </button>

      <h2
        style={{
          marginTop: 0,
          marginBottom: '1rem',
          marginLeft: '20px',
          marginRight: '20px',
          fontSize: '2rem',
          fontWeight: 600,
        }}
      >
        Order
      </h2>

      <div
        style={{
          marginLeft: '20px',
          marginRight: '20px',
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: 500,
              }}
            >
              Customer:
            </span>
            <span
              style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.87)',
                fontWeight: 600,
                marginLeft: '0.5rem',
              }}
            >
              {order.name || 'Unnamed Order'}
            </span>
          </div>
          <div>
            <span
              style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: 500,
              }}
            >
              Order ID:
            </span>
            <span
              style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.87)',
                fontWeight: 600,
                marginLeft: '0.5rem',
              }}
            >
              {order.orderId}
            </span>
          </div>
          <div>
            <span
              style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: 500,
              }}
            >
              Status:
            </span>
            <span
              style={{
                fontSize: '1rem',
                color: isCompleted ? '#4caf50' : '#ffa726',
                fontWeight: 600,
                marginLeft: '0.5rem',
                textTransform: 'capitalize',
              }}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>

      {order.lineItems.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          <p style={{ fontSize: '1.1rem', margin: 0 }}>
            No items in this order.
          </p>
        </div>
      ) : (
        <div
          style={{
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
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
