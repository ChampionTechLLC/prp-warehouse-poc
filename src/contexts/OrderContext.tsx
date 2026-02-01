import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'

import type { LineItem, Order } from '../types/order'
import { mockTransactions } from '../data/mockTransactions'

type OrderContextValue = {
  orders: Order[]
  currentOrder: Order | undefined
  completedOrders: Order[]
  setName: (name: string) => void
  addBottle: (bottleId: string, qty: number) => void
  updateQty: (lineItemId: number, qty: number) => void
  removeLineItem: (lineItemId: number) => void
  submitOrder: () => void
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined)

function createEmptyOrder(
  orderId: number,
  name: string,
  status: 'in-progress' | 'completed' = 'in-progress',
): Order {
  return {
    orderId,
    name,
    lineItems: [],
    status,
  }
}

export function OrderProvider({ children }: PropsWithChildren) {
  const initialOrderIdRef = useRef<number>(999)
  const nextLineItemIdRef = useRef<number>(1)

  const [orders, setOrders] = useState<Order[]>(() => [
    createEmptyOrder(initialOrderIdRef.current, '', 'in-progress'),
    ...mockTransactions,
  ])

  const currentOrder = useMemo(
    () => orders.find((o) => o.status === 'in-progress'),
    [orders],
  )

  const completedOrders = useMemo(
    () => orders.filter((o) => o.status === 'completed'),
    [orders],
  )

  const setName = useCallback(
    (name: string) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.status === 'in-progress' ? { ...order, name } : order,
        ),
      )
    },
    [],
  )

  const addBottle = useCallback((bottleId: string, qty: number) => {
    if (qty === 0) return

    setOrders((prev) =>
      prev.map((order) => {
        if (order.status !== 'in-progress') return order

        const existingIdx = order.lineItems.findIndex(
          (li) => li.bottleId === bottleId,
        )

        if (existingIdx === -1) {
          const newLineItem: LineItem = {
            lineItemId: nextLineItemIdRef.current++,
            bottleId,
            qty,
          }

          return {
            ...order,
            lineItems: [...order.lineItems, newLineItem],
          }
        }

        const existing = order.lineItems[existingIdx]
        const updated: LineItem = { ...existing, qty: existing.qty + qty }

        return {
          ...order,
          lineItems: order.lineItems.map((li) =>
            li.lineItemId === updated.lineItemId ? updated : li,
          ),
        }
      }),
    )
  }, [])

  const updateQty = useCallback((lineItemId: number, qty: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.status === 'in-progress'
          ? {
              ...order,
              lineItems: order.lineItems.map((li) =>
                li.lineItemId === lineItemId ? { ...li, qty } : li,
              ),
            }
          : order,
      ),
    )
  }, [])

  const removeLineItem = useCallback((lineItemId: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.status === 'in-progress'
          ? {
              ...order,
              lineItems: order.lineItems.filter(
                (li) => li.lineItemId !== lineItemId,
              ),
            }
          : order,
      ),
    )
  }, [])

  const submitOrder = useCallback(() => {
    setOrders((prev) => {
      const inProgressOrder = prev.find((o) => o.status === 'in-progress')
      if (!inProgressOrder) return prev

      console.log(inProgressOrder)

      nextLineItemIdRef.current = 1

      return prev
        .map((order) =>
          order.status === 'in-progress'
            ? { ...order, status: 'completed' as const }
            : order,
        )
        .concat(
          createEmptyOrder(
            Date.now() % 10000,
            inProgressOrder.name,
            'in-progress',
          ),
        )
    })
  }, [])

  const value = useMemo<OrderContextValue>(
    () => ({
      orders,
      currentOrder,
      completedOrders,
      setName,
      addBottle,
      updateQty,
      removeLineItem,
      submitOrder,
    }),
    [
      orders,
      currentOrder,
      completedOrders,
      setName,
      addBottle,
      updateQty,
      removeLineItem,
      submitOrder,
    ],
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext)
  if (!ctx) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return ctx
}

