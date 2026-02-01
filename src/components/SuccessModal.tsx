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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(4px)',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '20px',
          padding: '3.5rem 3rem',
          maxWidth: '450px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div
          style={{
            fontSize: '3.5rem',
            marginBottom: '1.5rem',
            lineHeight: 1,
            color: '#000000',
          }}
        >
          ✓
        </div>
        <h2
          style={{
            fontSize: '2.25rem',
            fontWeight: 700,
            color: '#1a1a1a',
            margin: '0 0 1rem 0',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {message && (
          <p
            style={{
              fontSize: '1.125rem',
              color: 'rgba(26, 26, 26, 0.75)',
              margin: 0,
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
