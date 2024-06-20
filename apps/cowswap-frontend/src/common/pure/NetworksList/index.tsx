import { COW_PROTOCOL_LINK, getChainInfo, L1ChainInfo, NetworkType } from '@cowprotocol/common-const'
import { getExplorerBaseUrl } from '@cowprotocol/common-utils'
import { SupportedChainId } from 'ccip-sdk'
import { ALL_SUPPORTED_CHAIN_IDS } from 'ccip-sdk'
import { ExternalLink } from '@cowprotocol/ui'

import { Trans } from '@lingui/macro'
import GoerliLogo from '@cowprotocol/assets/cow-swap/network-goerli-logo.svg'

import * as styledEl from './styled'

export interface NetworksListProps {
  currentChainId: SupportedChainId | null

  onSelectChain(targetChainId: SupportedChainId): void
}

export const HOLESKY_INFO: L1ChainInfo = {
  networkType: NetworkType.L1,
  docs: 'https://docs.cow.fi/',
  explorer: 'https://endpoints.omniatech.io/v1/eth/holesky/public',
  infoLink: COW_PROTOCOL_LINK,
  label: 'HOLESKY',
  name: 'holesky',
  explorerTitle: 'holeskyscan',
  logoUrl: GoerliLogo,
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
}

export function NetworksList(props: NetworksListProps) {
  const { currentChainId, onSelectChain } = props
  const PLUS_SUPPORTED_CHAIN = [...ALL_SUPPORTED_CHAIN_IDS, 17000]
  return (
    <>
      {PLUS_SUPPORTED_CHAIN.map((targetChainId: SupportedChainId) => {
        let info = getChainInfo(targetChainId)
        if (targetChainId === 17000) {
          info = HOLESKY_INFO
        }

        const { label, logoUrl, bridge, explorer, explorerTitle, helpCenterUrl } = info

        const isActive = targetChainId === currentChainId

        const rowContent = (
          <styledEl.FlyoutRow key={targetChainId} onClick={() => onSelectChain(targetChainId)} active={isActive}>
            <styledEl.Logo src={logoUrl} />
            <styledEl.NetworkLabel>{label}</styledEl.NetworkLabel>
            {isActive && <styledEl.FlyoutRowActiveIndicator active />}
          </styledEl.FlyoutRow>
        )

        if (!isActive) {
          return rowContent
        }

        return (
          <styledEl.ActiveRowWrapper key={targetChainId}>
            {rowContent}
            <styledEl.ActiveRowLinkList>
              {bridge && (
                <ExternalLink href={bridge}>
                  <Trans>Bridge</Trans>
                  <styledEl.LinkOutCircle />
                </ExternalLink>
              )}
              {explorer && (
                <ExternalLink href={explorer}>
                  <Trans>{explorerTitle}</Trans>
                  <styledEl.LinkOutCircle />
                </ExternalLink>
              )}
              {helpCenterUrl && (
                <ExternalLink href={helpCenterUrl}>
                  <Trans>Help Center</Trans>
                  <styledEl.LinkOutCircle />
                </ExternalLink>
              )}

              <ExternalLink href={getExplorerBaseUrl(targetChainId)}>
                <Trans>CoW Protocol Explorer</Trans>
                <styledEl.LinkOutCircle />
              </ExternalLink>
            </styledEl.ActiveRowLinkList>
          </styledEl.ActiveRowWrapper>
        )
      })}
    </>
  )
}
