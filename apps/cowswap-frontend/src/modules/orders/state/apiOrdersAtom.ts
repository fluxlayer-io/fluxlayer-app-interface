import { atom } from 'jotai'

import { EnrichedOrder } from 'ccip-sdk'

export const apiOrdersAtom = atom<EnrichedOrder[]>([])
