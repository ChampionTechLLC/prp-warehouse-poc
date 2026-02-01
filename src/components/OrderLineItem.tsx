import { useNavigate } from 'react-router-dom'
import type { Order } from '../types/order'

type OrderLineItemProps = {
  order: Order
}

export default function OrderLineItem({ order }: OrderLineItemProps) {
  const navigate = useNavigate()
  const totalBottles = order.lineItems.reduce((sum, item) => sum + item.qty, 0)

  const handleClick = () => {
    navigate('/order-review', { state: { order } })
  }

  return (
    <>
      <style>
        {`
          @media (min-width: 768px) {
            .order-line-item {
              max-width: 50vw !important;
              width: 50vw !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
          }
        `}
      </style>
      <div
        className="order-line-item"
        onClick={handleClick}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          marginBottom: '1rem',
          marginLeft: '20px',
          marginRight: '20px',
          width: 'calc(100vw - 40px)',
          maxWidth: 'calc(100vw - 40px)',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        <span
          style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.87)',
            fontWeight: 600,
          }}
        >
          {order.name || 'Unnamed Order'}
        </span>
        <span
          style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: 500,
          }}
        >
          Order ID: {order.orderId}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginLeft: 'auto',
        }}
      >
        <span
          style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: 500,
          }}
        >
          Bottles:
        </span>
        <span
          style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.87)',
            fontWeight: 600,
          }}
        >
          {totalBottles}
        </span>
      </div>
    </div>
    </>
  )
}

