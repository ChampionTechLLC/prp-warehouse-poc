import type { LineItem } from '../types/order'

type CartLineItemProps = {
  lineItem: LineItem
  onUpdateQty?: (lineItemId: number, qty: number) => void
}

export default function CartLineItem({
  lineItem,
  onUpdateQty,
}: CartLineItemProps) {
  const handleIncrease = () => {
    if (onUpdateQty) {
      onUpdateQty(lineItem.lineItemId, lineItem.qty + 1)
    }
  }

  const handleDecrease = () => {
    if (onUpdateQty && lineItem.qty > 1) {
      onUpdateQty(lineItem.lineItemId, lineItem.qty - 1)
    }
  }

  const canEdit = !!onUpdateQty
  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        marginBottom: '1rem',
        width: '90vw',
        maxWidth: '90vw',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
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
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/044/813/102/small/black-wine-bottle-isolated-on-transparent-background-png.png"
        alt={lineItem.bottleId}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '8px',
          flexShrink: 0,
          marginRight: '10px',
          objectFit: 'cover',
        }}
      />
      <span
        style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.87)',
          fontWeight: 600,
        }}
      >
        {lineItem.bottleId}
      </span>
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
          Qty:
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          {canEdit && (
            <button
              type="button"
              onClick={handleIncrease}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.87)',
                cursor: 'pointer',
                padding: '0',
                fontSize: '0.75rem',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#646cff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.87)'
              }}
            >
              ▲
            </button>
          )}
          <span
            style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.87)',
              fontWeight: 600,
            }}
          >
            {lineItem.qty}
          </span>
          {canEdit && (
            <button
              type="button"
              onClick={handleDecrease}
              disabled={lineItem.qty <= 1}
              style={{
                background: 'transparent',
                border: 'none',
                color:
                  lineItem.qty <= 1
                    ? 'rgba(255, 255, 255, 0.3)'
                    : 'rgba(255, 255, 255, 0.87)',
                cursor: lineItem.qty <= 1 ? 'not-allowed' : 'pointer',
                padding: '0',
                fontSize: '0.75rem',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                if (lineItem.qty > 1) {
                  e.currentTarget.style.color = '#646cff'
                }
              }}
              onMouseLeave={(e) => {
                if (lineItem.qty > 1) {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.87)'
                }
              }}
            >
              ▼
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
