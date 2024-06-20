import { getChainInfo } from '@cowprotocol/common-const'
import { ALL_SUPPORTED_CHAIN_IDS } from 'ccip-sdk'

import { Trans } from '@lingui/macro'
import { AlertCircle } from 'react-feather'
import styled from 'styled-components/macro'

import { useIsProviderNetworkUnsupported } from 'common/hooks/useIsProviderNetworkUnsupported'
import { useWeb3React } from '@web3-react/core'

export const UNSUPPORTED_WALLET_TEXT = (
  <Trans>
    Please connect your wallet to one of our supported networks:
    <br />
    {ALL_SUPPORTED_CHAIN_IDS.map((chainId) => getChainInfo(chainId)?.label)
      .filter(Boolean)
      .join(', ')}
  </Trans>
)

const Wrapper = styled.div`
  position: fixed;
  right: 20px;
  top: 100px;

  display: flex;
  background: ${({ theme }) => theme.alert};
  z-index: 3;
  width: 360px;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid rgb(7, 22, 45);
  box-shadow: rgb(7, 22, 45) 2px 2px 0;
`

const StyledAlertCircle = styled(AlertCircle)`
  color: ${({ theme }) => theme.red3};
`

export function WalletUnsupportedNetworkBanner() {
  const isChainIdUnsupported = useIsProviderNetworkUnsupported()
  const { chainId } = useWeb3React()

  return (
    <>
      {chainId !== 17000 && isChainIdUnsupported && (
        <Wrapper>
          <div>
            <StyledAlertCircle size={24} />
          </div>
          <div>{UNSUPPORTED_WALLET_TEXT}</div>
        </Wrapper>
      )}
    </>
  )
}
