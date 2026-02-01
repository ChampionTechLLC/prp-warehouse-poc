import type { Order } from '../types/order'

export const mockTransactions: Order[] = [
  {
    orderId: 1003,
    name: 'Carla Nguyen',
    lineItems: [
      { lineItemId: 1, bottleId: 'merlot-01', qty: 4 },
    ],
    status: 'completed',
  },
  {
    orderId: 1004,
    name: 'Daniel Benson',
    lineItems: [
      { lineItemId: 1, bottleId: 'riesling-01', qty: 2 },
      { lineItemId: 2, bottleId: 'malbec-01', qty: 5 },
      { lineItemId: 3, bottleId: 'syrah-01', qty: 1 },
      { lineItemId: 4, bottleId: 'zinfandel-01', qty: 2 },
    ],
    status: 'completed',
  },
  {
    orderId: 1005,
    name: 'Elena Garcia',
    lineItems: [
      { lineItemId: 1, bottleId: 'cabernet-02', qty: 1 },
      { lineItemId: 2, bottleId: 'pinot-grigio-01', qty: 3 },
    ],
    status: 'completed',
  },
]
