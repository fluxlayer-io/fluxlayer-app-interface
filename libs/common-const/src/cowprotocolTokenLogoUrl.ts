import { SupportedChainId } from 'ccip-sdk'

const tokenUrlRoot = 'https://raw.githubusercontent.com/chainlink-hack-2023/token-lists/main/src/public/images'

export const cowprotocolTokenLogoUrl = (address: string, chainId: SupportedChainId) =>
  `${tokenUrlRoot}/${chainId}/${address}/logo.png`
