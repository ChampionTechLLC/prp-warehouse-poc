import './App.css'
import { OrderProvider } from './contexts/OrderContext'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <OrderProvider>
      <AppRouter />
    </OrderProvider>
  )
}

export default App
