import type { Order } from '../types/order'

export const mockOrders: Order[] = [

  {
    orderId: 1002,
    name: 'Brian Smith',
    lineItems: [
      { lineItemId: 1, bottleId: 'CUHXXD', qty: 3 },
      { lineItemId: 2, bottleId: 'PLBXXD', qty: 2 },
      { lineItemId: 3, bottleId: 'IMS21D', qty: 1 },
    ],
    status: 'completed',
  },
  {
    orderId: 1003,
    name: 'Carla Nguyen',
    lineItems: [
      { lineItemId: 1, bottleId: 'ITR15D', qty: 4 },
    ],
    status: 'completed',
  },
  {
    orderId: 1004,
    name: 'Daniel Benson',
    lineItems: [
      { lineItemId: 1, bottleId: 'PED18B', qty: 2 },
      { lineItemId: 2, bottleId: 'ITU21D', qty: 5 },
      { lineItemId: 3, bottleId: 'ITR15D', qty: 1 },
      { lineItemId: 4, bottleId: 'PLBXXD', qty: 2 },
    ],
    status: 'completed',
  },
  {
    orderId: 1005,
    name: 'Elena Garcia',
    lineItems: [
      { lineItemId: 1, bottleId: 'CUHXXD', qty: 1 },
      { lineItemId: 2, bottleId: 'IMS21D', qty: 3 },
    ],
    status: 'completed',
  },
]

