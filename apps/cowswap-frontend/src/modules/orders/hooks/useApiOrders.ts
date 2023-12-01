import { useAtomValue } from 'jotai'

import { EnrichedOrder } from 'ccip-sdk'

import { apiOrdersAtom } from '../state/apiOrdersAtom'

export function useApiOrders(): EnrichedOrder[] {
  return useAtomValue(apiOrdersAtom)
}
