import { SupportedChainId } from 'ccip-sdk'

const chainIdToName: Record<SupportedChainId, string> = {
  [SupportedChainId.MAINNET]: 'ethereum',
  [SupportedChainId.GNOSIS_CHAIN]: 'xdai',
  [SupportedChainId.GOERLI]: 'ethereum',
  [SupportedChainId.FUJI]: 'avalanchecfuji',
  [SupportedChainId.MUMBAI]: 'polygonmumbai',
  [SupportedChainId.POLYZK_TESTNET]: 'polygonzkevm',
  [SupportedChainId.SEPOLIA]: 'ethereum',
  [SupportedChainId.OP_TESTNET]: 'optimism',
  [SupportedChainId.HOLESKY]: 'ethereum',
}

export function trustTokenLogoUrl(address: string, chainId: SupportedChainId): string {
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainIdToName[chainId]}/assets/${address}/logo.png`
}
