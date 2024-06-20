import { SupportedChainId } from 'ccip-sdk'

const chainNameToIdMap: { [key: string]: SupportedChainId } = {
  mainnet: SupportedChainId.MAINNET,
  gnosis_chain: SupportedChainId.GNOSIS_CHAIN,
  goerli: SupportedChainId.GOERLI,
}

export function getCurrentChainIdFromUrl(): SupportedChainId | number {
  // Trying to get chainId from URL (#/100/swap)
  // eslint-disable-next-line no-restricted-globals
  const { location } = window
  const urlChainIdMatch = location.hash.match(/^#\/(\d{1,9})\D/)
  const searchParams = new URLSearchParams(location.hash.split('?')[1])
  const chainQueryParam = searchParams.get('chain')
  if (chainQueryParam?.toUpperCase() === 'HOLESKY') return 17000
  const chainId = +(urlChainIdMatch?.[1] || chainNameToIdMap[chainQueryParam || ''] || '')

  if (chainId && chainId in SupportedChainId) return chainId
  return SupportedChainId.MAINNET
}
