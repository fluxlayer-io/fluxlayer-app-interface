import { SupportedChainId } from 'ccip-sdk'

const tokenUrlRoot = 'https://raw.githubusercontent.com/sydweb3/token-lists/main/src/public/images'

export const cowprotocolTokenLogoUrl = (address: string, chainId: SupportedChainId) =>
  `${tokenUrlRoot}/${chainId}/${address}/logo.png`
