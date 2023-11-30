import { atom } from 'jotai'

import { OrderQuoteResponse } from 'ccip-sdk'

export const fullAmountQuoteAtom = atom<OrderQuoteResponse | null>(null)
