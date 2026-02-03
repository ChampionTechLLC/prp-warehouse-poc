import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html5Qrcode } from 'html5-qrcode'

import { bottles } from '../data/bottles'
import { isMobileDevice } from '../utils/deviceDetection'
import ScannerOverlay from '../components/ScannerOverlay'
import '../styles/pages/Scan.css'
import type { Bottle } from '../types/bottle'

export default function Scan() {
  const navigate = useNavigate()
  const scannerRef = useRef<Html5Qrcode | null>(null)
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


    const onScan = (bottle: Bottle) => {
        navigate('/bottle', { state: { bottle } })
      }

      const handleSimulateScan = () => {
        if (bottles.length === 0) return

        const randomIndex = Math.floor(Math.random() * bottles.length)
        const randomBottle = bottles[randomIndex]

        onScan(randomBottle)
      }

    // Callback functions for scanning
    const onScanSuccess = (decodedText: string) => {
        handleSimulateScan()

      ///// THIS IS THE REAL CODE TO FIND AND NAVIGATE
      // Match scanned code to bottle SKU or bottleId
      // const matchedBottle = bottles.find(
      //   (bottle) =>
      //     bottle.sku === decodedText || bottle.bottleId === decodedText,
      // )

      // if (matchedBottle) {
      //   // Stop scanning before navigation
      //   if (scannerRef.current) {
      //     scannerRef.current.stop().catch(console.error)
      //   }
      //   navigate('/bottle', { state: { bottle: matchedBottle } })
      // }
      // If no match found, continue scanning (silently ignore)
      ////// END REAL CODE TO FIND AND NAVIGATE
    }

    const onScanFailure = () => {
      // Ignore scan failures - they happen frequently when no code is in view
      // Only log if needed for debugging
    }

    // Initialize scanner
    const initScanner = async () => {
      try {
        const html5QrCode = new Html5Qrcode(scannerElementId)
        scannerRef.current = html5QrCode

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          facingMode: 'environment', // Use back camera
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
        if (err instanceof Error) {
          if (err.message.includes('Permission denied')) {
            setError('Camera permission denied. Please allow camera access.')
          } else if (err.message.includes('No camera found')) {
            setError('No camera found on this device.')
          } else {
            setError(`Failed to start camera: ${err.message}`)
          }
        } else {
          setError('Failed to start camera scanner.')
        }
      }
    }

    initScanner()

    // Cleanup on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current?.clear()
            scannerRef.current = null
          })
          .catch((err) => {
            console.error('Error stopping scanner:', err)
          })
      }
    }
  }, [navigate])

  const handleBack = () => {
    if (scannerRef.current) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current?.clear()
          navigate('/')
        })
        .catch(console.error)
    } else {
      navigate('/')
    }
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

      {isScanning && <ScannerOverlay />}
    </div>
  )
}


