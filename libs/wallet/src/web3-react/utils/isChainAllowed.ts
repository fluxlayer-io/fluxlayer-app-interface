import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from 'ccip-sdk'
import { Connector } from '@web3-react/types'

import { getWeb3ReactConnection } from './getWeb3ReactConnection'

import { ConnectionType } from '../../api/types'
const PLUS_SUPPORTED = [...ALL_SUPPORTED_CHAIN_IDS, 17000]

const allowedChainsByWallet: Record<ConnectionType, SupportedChainId[]> = {
  [ConnectionType.INJECTED]: PLUS_SUPPORTED,
  [ConnectionType.INJECTED_WIDGET]: PLUS_SUPPORTED,
  [ConnectionType.COINBASE_WALLET]: PLUS_SUPPORTED,
  [ConnectionType.WALLET_CONNECT_V2]: PLUS_SUPPORTED,
  [ConnectionType.NETWORK]: PLUS_SUPPORTED,
  [ConnectionType.GNOSIS_SAFE]: PLUS_SUPPORTED,
  [ConnectionType.TALLY]: PLUS_SUPPORTED,
  [ConnectionType.TRUST]: PLUS_SUPPORTED,
  [ConnectionType.LEDGER]: PLUS_SUPPORTED,
  [ConnectionType.TREZOR]: PLUS_SUPPORTED,
  [ConnectionType.KEYSTONE]: PLUS_SUPPORTED,
  [ConnectionType.ALPHA]: [],
  [ConnectionType.AMBIRE]: [],
  [ConnectionType.ZENGO]: [],
}

export function isChainAllowed(connector: Connector, chainId: number): boolean {
  const connection = getWeb3ReactConnection(connector)

  return allowedChainsByWallet[connection.type].includes(chainId)
}
