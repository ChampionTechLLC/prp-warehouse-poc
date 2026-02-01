import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useOrder } from '../contexts/OrderContext'
import CartLineItem from '../components/CartLineItem'
import SuccessModal from '../components/SuccessModal'

export default function Cart() {
  const navigate = useNavigate()
  const { currentOrder, submitOrder, updateQty, setName } = useOrder()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmitOrder = () => {
    if (!currentOrder || currentOrder.lineItems.length === 0) return

    submitOrder()
    setShowSuccessModal(true)

    setTimeout(() => {
      setShowSuccessModal(false)
      setName('')
      navigate('/')
    }, 4000)
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
        paddingTop: '60px',
      }}
    >
      <button
        type="button"
        onClick={() => navigate('/')}
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
          marginBottom: '2rem',
          marginLeft: '20px',
          marginRight: '20px',
          fontSize: '2rem',
          fontWeight: 600,
        }}
      >
        Cart
      </h2>

      {!currentOrder || currentOrder.lineItems.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          <p style={{ fontSize: '1.1rem', margin: 0 }}>No items in your cart yet.</p>
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
            {currentOrder.lineItems.map((lineItem) => (
              <div key={lineItem.lineItemId}>
                <CartLineItem
                  lineItem={lineItem}
                  onUpdateQty={updateQty}
                />
              </div>
            ))}
        </div>
      )}

      <div
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
      >
        <button
          type="button"
          onClick={handleSubmitOrder}
          disabled={!currentOrder || currentOrder.lineItems.length === 0}
          style={{
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            border: '1px solid transparent',
            backgroundColor:
              !currentOrder || currentOrder.lineItems.length === 0
                ? '#3a3a3a'
                : '#646cff',
            color: 'rgba(255, 255, 255, 0.87)',
            cursor:
              !currentOrder || currentOrder.lineItems.length === 0
                ? 'not-allowed'
                : 'pointer',
            fontSize: '1.1em',
            fontFamily: 'inherit',
            fontWeight: 600,
            transition: 'background-color 0.25s, border-color 0.25s',
            opacity:
              !currentOrder || currentOrder.lineItems.length === 0 ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (currentOrder && currentOrder.lineItems.length > 0) {
              e.currentTarget.style.backgroundColor = '#535bf2'
            }
          }}
          onMouseLeave={(e) => {
            if (currentOrder && currentOrder.lineItems.length > 0) {
              e.currentTarget.style.backgroundColor = '#646cff'
            }
          }}
        >
          Submit order
        </button>
      </div>

      <SuccessModal
        show={showSuccessModal}
        title="Order submitted!"
        message="Meet your wine rep to proceed"
      />
    </div>
  )
}

