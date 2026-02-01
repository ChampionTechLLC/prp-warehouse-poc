import type { Order } from '../types/order'

export const mockOrders: Order[] = [
  {
    orderId: 1001,
    name: 'Alice Johnson',
    lineItems: [
      { lineItemId: 1, bottleId: 'Silver Oak Cabernet Sauvignon', qty: 2 },
      { lineItemId: 2, bottleId: 'Domaine Chardonnay Reserve', qty: 1 },
    ],
    status: 'in-progress',
  },
  {
    orderId: 1002,
    name: 'Brian Smith',
    lineItems: [
      { lineItemId: 1, bottleId: 'Burgundy Pinot Noir', qty: 3 },
      { lineItemId: 2, bottleId: 'Cloudy Bay Sauvignon Blanc', qty: 2 },
      { lineItemId: 3, bottleId: 'Whispering Angel Rosé', qty: 1 },
    ],
    status: 'in-progress',
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

