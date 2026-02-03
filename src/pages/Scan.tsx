import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'

import { bottles } from '../data/bottles'
import { isMobileDevice } from '../utils/deviceDetection'
import '../styles/pages/Scan.css'

export default function Scan() {
  const navigate = useNavigate()
  const scannerRef = useRef<Html5Qrcode | null>(null)
  // const lastScanTimeRef = useRef<number>(0)
  const [isMobile, setIsMobile] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scannedValue, setScannedValue] = useState<string | null>(null)
  const scannerElementId = 'html5qr-code-full-region'

  useEffect(() => {
    const checkMobile = isMobileDevice()
    setIsMobile(checkMobile)

    if (!checkMobile) {
      setError('Scanner is only available on mobile devices.')
      return
    }


    const onScan = (bottle: any) => {
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
      console.log('decodedText', decodedText)
      setScannedValue(decodedText)
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

    // Callback functions for scanning
    // const onScanSuccess = (decodedText: string) => {
    //   const now = Date.now()
    //   // Prevent processing the same scan within 500ms (debounce)
    //   if (now - lastScanTimeRef.current < 500) {
    //     return
    //   }
    //   lastScanTimeRef.current = now

    //   console.log('Scanned code:', decodedText)

    //   // Match scanned code to bottle SKU or bottleId
    //   const matchedBottle = bottles.find(
    //     (bottle) =>
    //       bottle.sku === decodedText || bottle.bottleId === decodedText,
    //   )

    //   if (matchedBottle) {
    //     // Stop scanning before navigation
    //     if (scannerRef.current) {
    //       scannerRef.current.stop().catch(console.error)
    //     }
    //     navigate('/bottle', { state: { bottle: matchedBottle } })
    //   }
    //   // If no match found, continue scanning (silently ignore)
    // }

    const onScanFailure = () => {
      // Ignore scan failures - they happen frequently when no code is in view
      // Only log if needed for debugging
    }

    // Initialize scanner - wait for DOM element to be ready
    const initScanner = async () => {
      // Check if HTTPS (required for camera access)
      if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        setError('Camera access requires HTTPS. Please access this page over a secure connection.')
        return
      }

      // Wait a bit to ensure DOM is ready
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Check if element exists
      const element = document.getElementById(scannerElementId)
      if (!element) {
        setError('Scanner element not found. Please refresh the page.')
        return
      }

      try {
        const html5QrCode = new Html5Qrcode(scannerElementId)
        scannerRef.current = html5QrCode

        // Try to get available cameras first for better error messages
        let cameras: Array<{ id: string; label: string }> = []
        try {
          cameras = await Html5Qrcode.getCameras()
        } catch (camErr) {
          console.error('Error getting cameras:', camErr)
          // If getCameras fails, try with facingMode constraint instead
        }

        const config = {
          fps: 30, // Increased from 10 to 30 for faster scanning
          qrbox: { width: 300, height: 300 }, // Slightly larger scanning area
          aspectRatio: 1.0,
          disableFlip: false, // Allow rotation detection
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
            Html5QrcodeSupportedFormats.CODE_93,
            Html5QrcodeSupportedFormats.CODABAR,
            Html5QrcodeSupportedFormats.ITF,
          ], // Explicitly enable barcode formats for faster detection
        }

        // If we have cameras, use the back camera, otherwise use facingMode constraint
        if (cameras.length > 0) {
          // Find back camera (environment facing)
          const backCamera = cameras.find(
            (camera) =>
              camera.label.toLowerCase().includes('back') ||
              camera.label.toLowerCase().includes('rear') ||
              camera.label.toLowerCase().includes('environment'),
          )

          const cameraId = backCamera?.id || cameras[0].id
          await html5QrCode.start(
            cameraId,
            config,
            onScanSuccess,
            onScanFailure,
          )
        } else {
          // Fallback to facingMode constraint (works on most mobile devices)
          await html5QrCode.start(
            { facingMode: 'environment' },
            config,
            onScanSuccess,
            onScanFailure,
          )
        }
        
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

      {isScanning && (
        <div className="scan-view-cart-container">
          {scannedValue && (
            <div className="scan-scanned-value">{scannedValue}</div>
          )}
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


