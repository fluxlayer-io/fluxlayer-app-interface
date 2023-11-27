import ms from 'ms.macro'

export interface TargetNetwork {
  title: string
  value: number
}

// export const MIN_CUSTOM_DEADLINE = ms`30min`
// export const MAX_CUSTOM_DEADLINE = Math.round(ms`1y` / 2) // 6 months

export const defaultTargetNetwork: TargetNetwork = { title: 'Goerli', value: 5 }

export const targetNetworks: TargetNetwork[] = [
  { title: 'Avalanche Fuji', value: 43113 },
  { title: 'Polygon Mumbai', value: 80001 },
  defaultTargetNetwork,
  { title: 'PolyzkEVM testnet', value: 1442 },
]
