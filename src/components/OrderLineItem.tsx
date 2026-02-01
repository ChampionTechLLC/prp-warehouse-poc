import { useNavigate } from 'react-router-dom'
import type { Order } from '../types/order'
import '../styles/components/OrderLineItem.css'

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
    <div className="order-line-item" onClick={handleClick}>
      <div className="order-line-item-info">
        <span className="order-line-item-name">
          {order.name || 'Unnamed Order'}
        </span>
        <span className="order-line-item-id">Order ID: {order.orderId}</span>
      </div>
      <div className="order-line-item-bottles">
        <span className="order-line-item-bottles-label">Bottles:</span>
        <span className="order-line-item-bottles-value">{totalBottles}</span>
      </div>
    </div>
  )
}

