import type { Bottle } from '../types/bottle'
import { mockOrders } from './mockOrders'

const uniqueBottleIds = Array.from(
  new Set(
    mockOrders.flatMap((order) =>
      order.lineItems.map((lineItem) => lineItem.bottleId),
    ),
  ),
)

export const bottles: Bottle[] = uniqueBottleIds.map((bottleId) => ({
  bottleId,
  name: bottleId,
  description: '',
  imgUrl: '',
}))

