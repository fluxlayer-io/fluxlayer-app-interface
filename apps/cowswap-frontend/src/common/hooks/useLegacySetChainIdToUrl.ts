import { useCallback } from 'react'

import { getChainInfo } from '@cowprotocol/common-const'
import { SupportedChainId } from 'ccip-sdk'

import { useLocation, useNavigate } from 'react-router-dom'

import { useTradeTypeInfo } from 'modules/trade'
import { HOLESKY_INFO } from 'common/pure/NetworksList'

/**
 * Changing chainId in query parameters: ?chain=mainnet
 */
export function useLegacySetChainIdToUrl() {
  const navigate = useNavigate()
  const location = useLocation()
  const tradeTypeInfo = useTradeTypeInfo()

  return useCallback(
    (chainId: SupportedChainId) => {
      // Don't set chainId as query parameter because swap and limit orders have different routing scheme
      if (tradeTypeInfo) return

      let chainInfo = getChainInfo(chainId)
      if (chainId === 17000) {
        chainInfo = HOLESKY_INFO
      }

      if (!chainInfo) return

      navigate(
        {
          pathname: location.pathname,
          search: replaceURLParam(location.search, 'chain', chainInfo.name),
        },
        { replace: true }
      )
    },
    [tradeTypeInfo, navigate, location]
  )
}

const replaceURLParam = (search: string, param: string, newValue: string) => {
  const searchParams = new URLSearchParams(search)
  searchParams.set(param, newValue)
  return searchParams.toString()
}
