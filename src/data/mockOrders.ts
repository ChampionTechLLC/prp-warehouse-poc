import type { Order } from '../types/order'

export const mockOrders: Order[] = [
  {
    orderId: 1001,
    name: 'Alice Johnson',
    lineItems: [
      { lineItemId: 1, bottleId: 'cabernet-01', qty: 2 },
      { lineItemId: 2, bottleId: 'chardonnay-01', qty: 1 },
    ],
    status: 'in-progress',
  },
  {
    orderId: 1002,
    name: 'Brian Smith',
    lineItems: [
      { lineItemId: 1, bottleId: 'pinot-noir-02', qty: 3 },
      { lineItemId: 2, bottleId: 'sauvignon-blanc-01', qty: 2 },
      { lineItemId: 3, bottleId: 'rose-01', qty: 1 },
    ],
    status: 'in-progress',
  },
]

