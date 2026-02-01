import '../styles/components/SuccessModal.css'

type SuccessModalProps = {
  show: boolean
  title: string
  message?: string
}

export default function SuccessModal({
  show,
  title,
  message,
}: SuccessModalProps) {
  if (!show) return null

  return (
    <div className="success-modal-overlay">
      <div className="success-modal-content">
        <div className="success-modal-icon">✓</div>
        <h2 className="success-modal-title">{title}</h2>
        {message && <p className="success-modal-message">{message}</p>}
      </div>
    </div>
  )
}
