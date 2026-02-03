import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'

import { bottles } from '../data/bottles'
import { isMobileDevice } from '../utils/deviceDetection'
import '../styles/pages/Scan.css'

export default function Scan() {
  const navigate = useNavigate()
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const lastScanTimeRef = useRef<number>(0)
  const [isMobile, setIsMobile] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const scannerElementId = 'html5qr-code-full-region'

  useEffect(() => {
    const checkMobile = isMobileDevice()
    setIsMobile(checkMobile)

    if (!checkMobile) {
      setError('Scanner is only available on mobile devices.')
      return
    }


    const onScanSuccess = (decodedText: string) => {
      const now = Date.now()
      if (now - lastScanTimeRef.current < 500) {
        return
      }
      lastScanTimeRef.current = now

      const matchedBottle = bottles.find(
        (bottle) =>
          (bottle.sku).toLowerCase() === (decodedText).toLowerCase(),
      )

      if (matchedBottle) {
        navigate('/bottle', { state: { bottle: matchedBottle } })
      }
    }

    const onScanFailure = () => {
    }

    const initScanner = async () => {
      if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        setError('Camera access requires HTTPS. Please access this page over a secure connection.')
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 100))

      const element = document.getElementById(scannerElementId)
      if (!element) {
        setError('Scanner element not found. Please refresh the page.')
        return
      }

      try {
        const html5QrCode = new Html5Qrcode(scannerElementId)
        scannerRef.current = html5QrCode

        const config = {
          fps: 20,
          qrbox: { width: 400, height: 150 },
          disableFlip: true,
          videoConstraints: {
            facingMode: 'environment',
            width: { ideal: 480 },
            height: { ideal: 360 },
          },
          formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128],
        }

        await html5QrCode.start(
          { facingMode: 'environment' },
          config,
          onScanSuccess,
          onScanFailure,
        )
        
        setIsScanning(true)
      } catch (err) {
        console.error('Error starting scanner:', err)
        let errorMessage = 'Failed to start camera scanner.'
        
        if (err instanceof Error) {
          const errMsg = err.message.toLowerCase()
          const errName = err.name?.toLowerCase() || ''
          console.error('Full error details:', {
            name: err.name,
            message: err.message,
            stack: err.stack,
          })
          
          if (
            errMsg.includes('permission') ||
            errMsg.includes('not allowed') ||
            errMsg.includes('denied') ||
            errName.includes('notallowederror')
          ) {
            errorMessage =
              'Camera permission denied. Please allow camera access in your browser settings and refresh the page.'
          } else if (
            errMsg.includes('not found') ||
            errMsg.includes('no camera') ||
            errName.includes('notfounderror')
          ) {
            errorMessage = 'No camera found on this device.'
          } else if (
            errMsg.includes('not readable') ||
            errMsg.includes('in use') ||
            errMsg.includes('overconstrained') ||
            errName.includes('notreadableerror')
          ) {
            errorMessage =
              'Camera is already in use by another application. Please close other apps using the camera.'
          } else if (errMsg.includes('constraint')) {
            errorMessage =
              'Camera constraints not supported. Your device may not have a back camera.'
          } else {
            errorMessage = `Failed to start camera: ${err.message || 'Unknown error'}`
          }
        }
        
        setError(errorMessage)
      }
    }

    initScanner()

    return () => {
      if (scannerRef.current) {
        const scanner = scannerRef.current
        scannerRef.current = null
        scanner
          .stop()
          .then(() => {
            scanner.clear()
          })
          .catch((err) => {
            console.error('Error stopping scanner:', err)
            try {
              scanner.clear()
            } catch (clearErr) {
              console.error('Error clearing scanner:', clearErr)
            }
          })
      }
    }
  }, [navigate])

  const handleBack = () => {
    navigate('/')
  }

  if (!isMobile) {
    return (
      <div className="page-container">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="back-button"
        >
          ← Back
        </button>
        <div className="scan-error-container">
          <h2 className="scan-error-title">Mobile Device Required</h2>
          <p className="scan-error-message">
            The scanner is only available on mobile devices. Please use a
            smartphone or tablet to access this feature.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container">
        <button
          type="button"
          onClick={handleBack}
          className="back-button"
        >
          ← Back
        </button>
        <div className="scan-error-container">
          <h2 className="scan-error-title">Scanner Error</h2>
          <p className="scan-error-message">{error}</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="primary-button"
            style={{ marginTop: '1rem' }}
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="scan-container">
      <button
        type="button"
        onClick={handleBack}
        className="back-button"
      >
        ← Back
      </button>

      <div id={scannerElementId} className="scanner-video-container" />

      {isScanning && (
        <div className="scan-view-cart-container">
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="scan-view-cart-button"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  )
}


