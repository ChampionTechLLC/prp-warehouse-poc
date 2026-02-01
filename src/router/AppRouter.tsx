import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Admin from '../pages/Admin'
import Cart from '../pages/Cart'
import Scan from '../pages/Scan'
import Bottle from '../pages/Bottle'
import OrderReview from '../pages/OrderReview'

export default function AppRouter() {
  return (
    <BrowserRouter basename="/prp-warehouse-poc">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/bottle" element={<Bottle />} />
        <Route path="/order-review" element={<OrderReview />} />
      </Routes>
    </BrowserRouter>
  )
}

