import type { LineItem } from '../types/order'
import '../styles/components/CartLineItem.css'

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
    <div className="cart-line-item">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/044/813/102/small/black-wine-bottle-isolated-on-transparent-background-png.png"
        alt={lineItem.bottleId}
        className="cart-line-item-image"
      />
      <span className="cart-line-item-name">{lineItem.bottleId}</span>
      <div className="cart-line-item-qty-container">
        <span className="cart-line-item-qty-label">Qty:</span>
        <div className="cart-line-item-qty-controls">
          {canEdit && (
            <button
              type="button"
              onClick={handleIncrease}
              className="qty-button"
            >
              ▲
            </button>
          )}
          <span className="cart-line-item-qty-value">{lineItem.qty}</span>
          {canEdit && (
            <button
              type="button"
              onClick={handleDecrease}
              disabled={lineItem.qty <= 1}
              className="qty-button"
            >
              ▼
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
