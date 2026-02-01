import { useMemo } from 'react'

import type { LineItem } from '../types/order'
import { bottles } from '../data/bottles'
import '../styles/components/CartLineItem.css'

type CartLineItemProps = {
  lineItem: LineItem
  onUpdateQty?: (lineItemId: number, qty: number) => void
}

export default function CartLineItem({
  lineItem,
  onUpdateQty,
}: CartLineItemProps) {
  const bottle = useMemo(
    () => bottles.find((b) => b.bottleId === lineItem.bottleId),
    [lineItem.bottleId],
  )

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
      {bottle?.imgUrl ? (
        <img
          src={bottle.imgUrl}
          alt={bottle.name}
          className="cart-line-item-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
      ) : (
        <div className="cart-line-item-image-placeholder">No Image</div>
      )}
      <div className="cart-line-item-info">
        <span className="cart-line-item-name">
          {bottle?.name || lineItem.bottleId}
        </span>
        {bottle && (
          <span className="cart-line-item-price">
            ${bottle.price.toFixed(2)} ea
          </span>
        )}
      </div>
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
