import { useOrder } from '../contexts/OrderContext'
import { useNavigate } from 'react-router-dom'
import OrderLineItem from '../components/OrderLineItem'

export default function Admin() {
  const navigate = useNavigate()
  const { orders, completedOrders } = useOrder()
  
  const inProgressOrders = orders.filter(
    (o) => o.status === 'in-progress' && o.name && o.name.trim() !== '',
  )

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
        Admin
      </h2>
      <h3
        style={{
          marginLeft: '20px',
          marginRight: '20px',
          marginBottom: '1rem',
          fontSize: '1.5rem',
          fontWeight: 600,
        }}
      >
        Orders In Progress
      </h3>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {inProgressOrders.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem 1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              marginLeft: '20px',
              marginRight: '20px',
            }}
          >
            <p style={{ fontSize: '1rem', margin: 0 }}>
              No orders in progress.
            </p>
          </div>
        ) : (
          inProgressOrders.map((order) => (
            <OrderLineItem key={order.orderId} order={order} />
          ))
        )}
      </section>
      <h3
        style={{
          marginLeft: '20px',
          marginRight: '20px',
          marginTop: '3rem',
          marginBottom: '1rem',
          fontSize: '1.5rem',
          fontWeight: 600,
        }}
      >
        Complete Orders
      </h3>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {completedOrders.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem 1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              marginLeft: '20px',
              marginRight: '20px',
            }}
          >
            <p style={{ fontSize: '1rem', margin: 0 }}>No completed orders yet.</p>
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


