import type { Order } from '../types/order'

export const mockTransactions: Order[] = [
  {
    orderId: 1003,
    name: 'Carla Nguyen',
    lineItems: [
      { lineItemId: 1, bottleId: 'Duckhorn Merlot', qty: 4 },
    ],
    status: 'completed',
  },
  {
    orderId: 1004,
    name: 'Daniel Benson',
    lineItems: [
      { lineItemId: 1, bottleId: 'Dr. Loosen Riesling', qty: 2 },
      { lineItemId: 2, bottleId: 'Catena Malbec', qty: 5 },
      { lineItemId: 3, bottleId: 'Penfolds Syrah', qty: 1 },
      { lineItemId: 4, bottleId: 'Ridge Zinfandel', qty: 2 },
    ],
    status: 'completed',
  },
  {
    orderId: 1005,
    name: 'Elena Garcia',
    lineItems: [
      { lineItemId: 1, bottleId: 'Caymus Cabernet Sauvignon', qty: 1 },
      { lineItemId: 2, bottleId: 'Santa Margherita Pinot Grigio', qty: 3 },
    ],
    status: 'completed',
  },
]
