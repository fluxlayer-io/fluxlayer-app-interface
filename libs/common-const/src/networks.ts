import { SupportedChainId } from 'ccip-sdk'
import { JsonRpcProvider } from '@ethersproject/providers'

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY || '2af29cd5ac554ae3b8d991afe1ba4b7d' // Default rate-limited infura key (should be overridden, not reliable to use)

const RPC_URL_ENVS: Record<SupportedChainId, string | undefined> = {
  [SupportedChainId.MAINNET]: process.env.REACT_APP_NETWORK_URL_1 || undefined,
  [SupportedChainId.GNOSIS_CHAIN]: process.env.REACT_APP_NETWORK_URL_100 || undefined,
  [SupportedChainId.GOERLI]: process.env.REACT_APP_NETWORK_URL_5 || undefined,
  [SupportedChainId.MUMBAI]: process.env.REACT_APP_NETWORK_URL_80001 || undefined,
  [SupportedChainId.FUJI]: process.env.REACT_APP_NETWORK_URL_43113 || undefined,
  [SupportedChainId.POLYZK_TESTNET]: process.env.REACT_APP_NETWORK_URL_1442 || undefined,
  [SupportedChainId.SEPOLIA]: process.env.REACT_APP_NETWORK_URL_11155111 || undefined,
  [SupportedChainId.OP_TESTNET]: process.env.REACT_APP_NETWORK_URL_11155420 || undefined,
  [SupportedChainId.HOLESKY]: process.env.REACT_APP_NETWORK_URL_17000 || undefined,
}

const DEFAULT_RPC_URL: Record<SupportedChainId, { url: string; usesInfura: boolean }> = {
  [SupportedChainId.MAINNET]: { url: `https://mainnet.infura.io/v3/${INFURA_KEY}`, usesInfura: true },
  [SupportedChainId.GNOSIS_CHAIN]: { url: `https://rpc.gnosis.gateway.fm`, usesInfura: false },
  [SupportedChainId.GOERLI]: { url: `https://goerli.infura.io/v3/${INFURA_KEY}`, usesInfura: true },
  [SupportedChainId.FUJI]: { url: `https://api.avax-test.network/ext/bc/C/rpc`, usesInfura: false },
  [SupportedChainId.MUMBAI]: { url: `https://polygon-mumbai-bor.publicnode.com`, usesInfura: true },
  [SupportedChainId.POLYZK_TESTNET]: { url: `https://rpc.public.zkevm-test.net`, usesInfura: true },
  [SupportedChainId.SEPOLIA]: { url: `https://sepolia.gateway.tenderly.co`, usesInfura: true },
  [SupportedChainId.OP_TESTNET]: { url: `https://optimism-sepolia.blockpi.network/v1/rpc/public`, usesInfura: true },
  [SupportedChainId.HOLESKY]: { url: `http://localhost:8545`, usesInfura: true },
}

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
export const RPC_URLS = {
  [SupportedChainId.MAINNET]: getRpcUrl(SupportedChainId.MAINNET),
  [SupportedChainId.GNOSIS_CHAIN]: getRpcUrl(SupportedChainId.GNOSIS_CHAIN),
  [SupportedChainId.GOERLI]: getRpcUrl(SupportedChainId.GOERLI),
  [SupportedChainId.FUJI]: getRpcUrl(SupportedChainId.FUJI),
  [SupportedChainId.MUMBAI]: getRpcUrl(SupportedChainId.MUMBAI),
  [SupportedChainId.POLYZK_TESTNET]: getRpcUrl(SupportedChainId.POLYZK_TESTNET),
  [SupportedChainId.SEPOLIA]: getRpcUrl(SupportedChainId.POLYZK_TESTNET),
  [SupportedChainId.OP_TESTNET]: getRpcUrl(SupportedChainId.POLYZK_TESTNET),
  [SupportedChainId.HOLESKY]: getRpcUrl(SupportedChainId.HOLESKY),
}

export const MAINNET_PROVIDER = new JsonRpcProvider(RPC_URLS[SupportedChainId.MAINNET])

function getRpcUrl(chainId: SupportedChainId): string {
  const envKey = `REACT_APP_NETWORK_URL_${chainId}`
  const rpcUrl = RPC_URL_ENVS[chainId]

  if (rpcUrl) {
    return rpcUrl
  }

  const defaultRpc = DEFAULT_RPC_URL[chainId]
  if (defaultRpc.usesInfura && !INFURA_KEY) {
    throw new Error(`Either ${envKey} or REACT_APP_INFURA_KEY environment variable are required`)
  }

  return defaultRpc.url
}
