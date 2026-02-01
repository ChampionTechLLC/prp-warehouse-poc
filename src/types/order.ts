export interface LineItem {
  lineItemId: number
  bottleId: string
  qty: number
}

export interface Order {
  orderId: number
  name: string
  lineItems: LineItem[]
  status: 'in-progress' | 'completed'
}

