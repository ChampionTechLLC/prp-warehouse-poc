import { useOrder } from '../contexts/OrderContext'
import { useNavigate } from 'react-router-dom'
import OrderLineItem from '../components/OrderLineItem'
import '../styles/common.css'
import '../styles/pages/Admin.css'

export default function Admin() {
  const navigate = useNavigate()
  const { orders, completedOrders } = useOrder()
  
  const inProgressOrders = orders.filter(
    (o) => o.status === 'in-progress' && o.name && o.name.trim() !== '',
  )

  return (
    <div className="page-container">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="back-button"
      >
        ← Back
      </button>

      <h2 className="page-title">Admin</h2>
      <h3 className="section-title">Orders In Progress</h3>
      <section className="section-container">
        {inProgressOrders.length === 0 ? (
          <div className="empty-state">
            <p>No orders in progress.</p>
          </div>
        ) : (
          inProgressOrders.map((order) => (
            <OrderLineItem key={order.orderId} order={order} />
          ))
        )}
      </section>
      <h3 className="section-title-spaced">Complete Orders</h3>
      <section className="section-container">
        {completedOrders.length === 0 ? (
          <div className="empty-state">
            <p>No completed orders yet.</p>
          </div>
        ) : (
          completedOrders.map((transaction) => (
            <OrderLineItem key={transaction.orderId} order={transaction} />
          ))
        )}
      </section>
    </div>
  )
}


