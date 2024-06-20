import { HOLESKY_INFO } from './../../../../../apps/cowswap-frontend/src/common/pure/NetworksList/index';
import { SupportedChainId } from 'ccip-sdk'
import { Connector } from '@web3-react/types'

import { getWeb3ReactConnection } from './getWeb3ReactConnection'
import { isChainAllowed } from './isChainAllowed'

import { ConnectionType } from '../../api/types'
import { getIsWalletConnect } from '../hooks/useIsWalletConnect'
import { COW_PROTOCOL_LINK, getChainInfo, NetworkType, RPC_URLS } from '@cowprotocol/common-const'
import GoerliLogo from '@cowprotocol/assets/cow-swap/network-goerli-logo.svg'

function getRpcUrls(chainId: SupportedChainId): [string] {
  switch (chainId) {
    case SupportedChainId.MAINNET:
    case SupportedChainId.GOERLI:
      return [RPC_URLS[chainId]]
    case SupportedChainId.FUJI:
      return [RPC_URLS[chainId]]
    case SupportedChainId.MUMBAI:
      return [RPC_URLS[chainId]]
    case SupportedChainId.POLYZK_TESTNET:
      return [RPC_URLS[chainId]]
    case SupportedChainId.SEPOLIA:
      return [RPC_URLS[chainId]]
    case SupportedChainId.OP_TESTNET:
      return [RPC_URLS[chainId]]
    case SupportedChainId.GNOSIS_CHAIN:
      return ['https://rpc.gnosischain.com/']
    case 17000:
      return ['https://endpoints.omniatech.io/v1/eth/holesky/public/']
    default:
  }
  // Our API-keyed URLs will fail security checks when used with external wallets.
  throw new Error('RPC URLs must use public endpoints')
}

export const switchChain = async (connector: Connector, chainId: SupportedChainId) => {
  if (!isChainAllowed(connector, chainId)) {
    throw new Error(`Chain ${chainId} not supported for connector (${typeof connector})`)
  }

  const connection = getWeb3ReactConnection(connector)
  const isNetworkConnection = connection.type === ConnectionType.NETWORK
  const isWalletConnect = getIsWalletConnect(connector)

  if (isNetworkConnection || isWalletConnect) {
    await connector.activate(chainId)
  } else {
    let info = getChainInfo(chainId)
    if (chainId === 17000) {
      info = HOLESKY_INFO
    }
    const addChainParameter = {
      chainId,
      chainName: info.label,
      rpcUrls: getRpcUrls(chainId),
      nativeCurrency: info.nativeCurrency,
      blockExplorerUrls: [info.explorer],
    }
    await connector.activate(addChainParameter)
  }
}
