import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useOrder } from '../contexts/OrderContext'
import { bottles } from '../data/bottles'
import CartLineItem from '../components/CartLineItem'
import SuccessModal from '../components/SuccessModal'
import '../styles/common.css'
import '../styles/pages/Cart.css'

export default function Cart() {
  const navigate = useNavigate()
  const { currentOrder, submitOrder, updateQty, setName } = useOrder()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const totalPrice = useMemo(() => {
    if (!currentOrder) return 0
    return currentOrder.lineItems.reduce((total, lineItem) => {
      const bottle = bottles.find((b) => b.bottleId === lineItem.bottleId)
      return total + (bottle ? bottle.price * lineItem.qty : 0)
    }, 0)
  }, [currentOrder])

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
    <div className="page-container cart-page">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="back-button"
      >
        ← Back
      </button>

      <h2 className="page-title">Cart</h2>

      {!currentOrder || currentOrder.lineItems.length === 0 ? (
        <div className="empty-state-large">
          <p>No items in your cart yet.</p>
        </div>
      ) : (
        <div className="card-container">
          {currentOrder.lineItems.map((lineItem) => (
            <div key={lineItem.lineItemId}>
              <CartLineItem lineItem={lineItem} onUpdateQty={updateQty} />
            </div>
          ))}
        </div>
      )}

      <div className="fixed-bottom-button">
        {currentOrder && currentOrder.lineItems.length > 0 && (
          <div className="cart-total-price">
            Total: ${totalPrice.toFixed(2)}
          </div>
        )}
        <button
          type="button"
          onClick={handleSubmitOrder}
          disabled={!currentOrder || currentOrder.lineItems.length === 0}
          className="primary-button"
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

