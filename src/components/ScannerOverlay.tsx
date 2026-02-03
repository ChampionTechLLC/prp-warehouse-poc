import '../styles/components/ScannerOverlay.css'

type ScannerOverlayProps = {
  onViewCart?: () => void
}

export default function ScannerOverlay({ onViewCart }: ScannerOverlayProps) {
  return (
    <div className="scanner-overlay">
      <div className="scanner-viewfinder">
        <div className="viewfinder-corner viewfinder-corner-top-left" />
        <div className="viewfinder-corner viewfinder-corner-top-right" />
        <div className="viewfinder-corner viewfinder-corner-bottom-left" />
        <div className="viewfinder-corner viewfinder-corner-bottom-right" />
      </div>
      <div className="scanner-instructions">
        <p>Position the barcode or QR code within the frame</p>
      </div>
      {onViewCart && (
        <div className="scanner-view-cart-container">
          <button
            type="button"
            onClick={onViewCart}
            className="scanner-view-cart-button"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  )
}

